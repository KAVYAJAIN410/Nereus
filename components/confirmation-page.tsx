"use client"

import { useEffect, useState } from "react"
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

  const downloadInvoice = (data: any) => {
    const doc = new jsPDF()
    const companyName = "Nereus Wellness"

    doc.setFontSize(22)
    doc.setTextColor(40, 40, 40)
    doc.text(companyName, 20, 20)

    doc.setFontSize(12)
    doc.setTextColor(100)
    doc.text("Session Booking Invoice", 20, 30)

    doc.line(20, 35, 190, 35)

    doc.setTextColor(0)
    const infoStartY = 45
    const lineSpacing = 10

    const entries = [
      [`Invoice No.`, data.invoiceNumber],
      [`Payment ID`, data.paymentId],
      [`Date`, new Date().toLocaleDateString()],
      [`Name`, data.fullName],
      [`Email`, data.email],
      [`Session Date`, selectedSlot?.date],
      [`Session Time`, selectedSlot?.timeSlot],
      [`Amount Paid`, `₹${data.amount / 100}`],
    ]

    entries.forEach(([label, value], index) => {
      const y = infoStartY + index * lineSpacing
      doc.text(`${label}:`, 20, y)
      doc.text(`${value}`, 80, y)
    })

    doc.setFontSize(10)
    doc.setTextColor(130)
    doc.text("This invoice is auto-generated for your confirmed booking.", 20, infoStartY + entries.length * lineSpacing + 10)
    doc.text("For support, contact support@nereuswellness.com", 20, infoStartY + entries.length * lineSpacing + 18)

    doc.save(`Invoice_${data.invoiceNumber}.pdf`)
  }

  // ✅ Loader UI
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-white space-y-4">
        <svg
          className="animate-spin h-10 w-10 text-[#5cd2ec]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold">Verifying your payment...</p>
          <p className="text-sm text-gray-300">
            Please do not close this page. We're confirming your session.
          </p>
        </div>
      </div>
    )
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
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">₹{invoiceData?.amount / 100}</span>
          </div>
        </div>
      </div>

      <p className="text-lg font-medium text-white pt-4">
        This is where your potential stops hiding. See you there.
      </p>

      <div className="pt-4">
        <button
          className="bg-[#5cd2ec] text-white px-4 py-2 rounded"
          onClick={() => downloadInvoice(invoiceData)}
        >
          Download Invoice
        </button>
      </div>

      <div className="pt-6">
        <p className="text-sm text-white">A confirmation email has been sent to {email}</p>
      </div>
    </div>
  )
}
