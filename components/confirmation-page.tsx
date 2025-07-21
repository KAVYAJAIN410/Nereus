"use client"

import { useEffect, useState } from "react"
import autoTable from "jspdf-autotable"
import { CheckCircle, XCircle } from "lucide-react"
import jsPDF from "jspdf"
import type { FormData } from "./booking-form"

interface Slot {
  id: string
  date: string
  location: {
    name: string
    address: string
  }
  timeSlot: string
}

interface ConfirmationPageProps {
  formData: FormData
  selectedSlot: Slot | null
  paymentId: string
}

export default function ConfirmationPage({
  formData,
  selectedSlot,
  paymentId,
}: ConfirmationPageProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [invoiceData, setInvoiceData] = useState<any>(null)
  const [email, setEmail] = useState<String>("")

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ razorpay_payment_id: paymentId }),
        })

        const data = await res.json()
        setEmail(data.email)
        if (data.success) {
          setStatus("success")
          setInvoiceData(data)
        } else {
          setStatus("error")
        }
      } catch (e) {
        console.error("Verification failed", e)
        setStatus("error")
      }
    }

    verifyPayment()
  }, [paymentId])

  const downloadInvoice = (data: any, selectedSlot: Slot | null) => {
    const doc = new jsPDF()

    const company = {
      name: "NEREUS TECHNOLOGIES PRIVATE LIMITED",
      cin: "U27900KA2023PTC175890",
      addressLine1: "D-510, Sterling Residency, Dollars Colony, R.M.V. Extension II Stage,",
      addressLine2: "Bangalore North, Bangalore-560094, Karnataka, India",
      email: "info@nereustechnologies.com",
      website: "www.nereustechnologies.com",
    }

    const description = "The Nereus Experience"
    const quantity = 1
    const rate = data.originalAmount ?? data.amount

    const promo = data.promoCode
    let discountValue = 0
    let discountText = ""
    let finalAmount = data.amount

    if (promo) {
      if (promo.discountType === "percent") {
        discountValue = Math.round((rate * promo.discountValue) / 100)
        discountText = `${promo.discountValue}% off`
      } else if (promo.discountType === "flat" || promo.discountType === "amount") {
        discountValue = promo.discountValue
        discountText = `Flat INR ${promo.discountValue} off`
      }
    }
    let totalPaid = data.amount - discountValue; // ✅ Correct

    // Header
    doc.setFontSize(16)
    doc.text(company.name, 20, 20)

    doc.setFontSize(10)
    doc.setTextColor(80)
    doc.text(`CIN: ${company.cin}`, 20, 27)
    doc.text(company.addressLine1, 20, 32)
    doc.text(company.addressLine2, 20, 37)
    doc.text(`Email: ${company.email} | Website: ${company.website}`, 20, 42)

    // Invoice title
    doc.setFontSize(14)
    doc.setTextColor(0)
    doc.text("INVOICE", 20, 52)

    // Invoice Metadata
    let y = 65
    const invoiceDetails = [
      ["Invoice No.", data.invoiceNumber || "-"],
      ["Invoice Date", new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })],
      ["Payment ID", data.paymentId || "-"],
      ["Booking Platform", "Razorpay"],
    ]

    invoiceDetails.forEach(([label, value]) => {
      doc.setFontSize(11)
      doc.setTextColor(0)
      doc.text(`${label}:`, 20, y)
      doc.text(`${value}`, 80, y)
      y += 8
    })

    // Billed To
    y += 8
    doc.setFontSize(12)
    doc.text("Billed To", 20, y)
    y += 8
    doc.setFontSize(11)
    doc.text("Name:", 20, y)
    doc.text(data.fullName || "-", 80, y)
    y += 8
    doc.text("Email:", 20, y)
    doc.text(data.email || "-", 80, y)

    // Session Details
    y += 12
    doc.setFontSize(12)
    doc.text("Session Details", 20, y)
    y += 8
    doc.setFontSize(11)
    doc.text("Session Date:", 20, y)
    doc.text(selectedSlot?.date || "-", 80, y)
    y += 8
    doc.text("Session Time:", 20, y)
    doc.text(selectedSlot?.timeSlot || "-", 80, y)
    y += 8
    doc.text("Location:", 20, y)
    doc.text(selectedSlot?.location?.name || "Nereus Testing Facility", 80, y)

    // Pricing Summary
    y += 16
    doc.setFontSize(12)
    doc.text("Pricing Summary", 20, y)
    y += 10
    doc.setFontSize(11)

    // Original price
    doc.text("Session Price", 20, y)
    doc.text(`INR ${rate}`, 150, y, { align: "right" })
    y += 8

    // Discount
    if (promo) {
      doc.text("Promotional Discount", 20, y)
      doc.text(`-INR ${discountValue} (${discountText})`, 150, y, { align: "right" })
      y += 8

      // Divider
      doc.setDrawColor(180)
      doc.line(20, y, 190, y)
      y += 8
    }

    // Final amount
    doc.setFont("bold")
    doc.text("Total Paid", 20, y)
    doc.text(`INR ${totalPaid}`, 150, y, { align: "right" })
    doc.setFont("normal")

    y += 10
    doc.text("Payment Status", 20, y)
    doc.text("Paid", 150, y, { align: "right" })

    // Footer
    const footerY = y + 20
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text("This invoice confirms your booking for The Nereus Experience.", 20, footerY)
    doc.text("Further session instructions will be shared via WhatsApp and email.", 20, footerY + 6)

    doc.save(`Invoice_${data.invoiceNumber || "Nereus"}.pdf`)
  }

  if (status === "error") {
    return (
      <div className="text-center py-10 text-red-600">
        <XCircle className="w-12 h-12 mx-auto mb-4" />
        <p>Payment failed or not confirmed. Please try again or contact support.</p>
      </div>
    )
  }

  return (
    <div className="text-center py-8 space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full p-3">
          <CheckCircle className="h-12 w-12 text-[#5cd2ec]" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Thank You!</h2>
        <p className="text-white">Payment received. You're officially in. Your slot is confirmed for:</p>
      </div>

      <div className="max-w-xs mx-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{selectedSlot?.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{selectedSlot?.timeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Invoice No.:</span>
            <span className="font-medium">{invoiceData?.invoiceNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment ID:</span>
            <span className="font-medium">{invoiceData?.paymentId}</span>
          </div>
          
        </div>
      </div>

      <p className="text-lg font-medium text-white pt-4">
        This is where your potential stops hiding. See you there.
      </p>

      <div className="pt-4">
        <button
          className="bg-[#5cd2ec] text-white px-4 py-2 rounded"
          onClick={() => downloadInvoice(invoiceData, selectedSlot)}
        >
          Download Invoice
        </button>
      </div>

      <div className="pt-6">
        <p className="text-sm text-white">
          A confirmation email has been sent to {email}
        </p>
      </div>
    </div>
  )
}
