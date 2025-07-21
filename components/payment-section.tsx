"use client"

import { useEffect, useState } from "react"
import type { FormData } from "./booking-form"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Slot {
  id: string
  date: string
  location: {
    name: string
    address: string
  }
  timeSlot: string
  timeSlotId: string
}

interface PromoCode {
  id: string
  code: string
  discountType: "flat" | "percent"
  discountValue: number
}

interface PaymentSectionProps {
  formData: FormData
  selectedSlot: Slot | null
  nextStep: () => void
  prevStep: () => void
  setPaymentId: (id: string) => void
}

export default function PaymentSection({
  formData,
  selectedSlot,
  nextStep,
  prevStep,
  setPaymentId,
}: PaymentSectionProps) {
  const [amount, setAmount] = useState<number | null>(null)
  const [finalAmount, setFinalAmount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [selectedPromo, setSelectedPromo] = useState<PromoCode | null>(null)

  // Razorpay script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Fetch price
  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("/api/get-session-price", {
          method: "POST",
          body: JSON.stringify({ timeSlotId: selectedSlot?.timeSlotId }),
          headers: { "Content-Type": "application/json" },
        })

        const data = await res.json()
        setAmount(data.price)
        setFinalAmount(data.price)
      } catch (error) {
        console.error("Failed to fetch session price", error)
      }
    }

    if (selectedSlot?.timeSlotId) fetchPrice()
  }, [selectedSlot?.timeSlotId])

  // Fetch promo codes
  useEffect(() => {
    async function fetchPromos() {
      const res = await fetch("/api/promocodes")
      const data = await res.json()
      setPromoCodes(data)
    }

    fetchPromos()
  }, [])

  // Apply discount when promo selected
  useEffect(() => {
    if (!amount || !selectedPromo) {
      setFinalAmount(amount)
      return
    }

    const discount =
      selectedPromo.discountType === "flat"
        ? selectedPromo.discountValue
        : (selectedPromo.discountValue / 100) * amount

    setFinalAmount(Math.max(0, amount - discount))
  }, [selectedPromo, amount])

  // Handle payment
  const handlePayment = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          promoCodeId: selectedPromo?.id || null,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        alert(data.error || "Something went wrong. Please try again.")
        setLoading(false)
        prevStep()
        return
      }

      const order = data.order

      if (!(window as any).Razorpay) {
        alert("Razorpay SDK failed to load.")
        setLoading(false)
        return
      }

      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Nereus",
        description: "Session Booking",
        image: "/logo.png",
        order_id: order.id,
        handler: function (response: any) {
          setPaymentId(response.razorpay_payment_id)
          nextStep()
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.whatsapp,
        },
        theme: { color: "#3399cc" },
        modal: {
          ondismiss: () => setLoading(false),
        },
      })

      rzp.open()
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong while initiating payment.")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-[#5cd2ec]">Payment</h2>
        <p className="text-white">Complete your booking with secure payment</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-gray-800">Booking Summary</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {selectedSlot?.date
                      ? new Date(selectedSlot.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{selectedSlot?.location?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{selectedSlot?.timeSlot}</span>
                </div>

                {/* Promo Code Selector */}
                {promoCodes.length > 0 && (
                  <div className="flex justify-between items-center gap-2 pt-2">
                    <label className="text-gray-600 text-sm font-medium">Promo Code:</label>
                    <select
                      className="border rounded p-1 text-sm"
                      value={selectedPromo?.id || ""}
                      onChange={(e) => {
                        const promo = promoCodes.find(p => p.id === e.target.value) || null
                        setSelectedPromo(promo)
                      }}
                    >
                      <option value="">-- Select Promo --</option>
                      {promoCodes.map(promo => (
                        <option key={promo.id} value={promo.id}>
                          {promo.code} ({promo.discountType === "flat"
                            ? `₹${promo.discountValue}`
                            : `${promo.discountValue}%`} off)
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="border-t my-2 pt-2 flex justify-between">
                  <span className="font-medium text-gray-700">Total Amount:</span>
                  <span className="font-bold text-black">
                    ₹{finalAmount !== null ? finalAmount.toFixed(2) : "Loading..."}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Processing...
                </>
              ) : (
                "Pay Securely with Razorpay"
              )}
            </Button>

            <div className="text-sm text-gray-600 mt-4">
              <p className="mb-2 font-medium">Refund & Cancellation Policy:</p>
              <p>
                As per the Refund & Cancellation Policy, sessions cancelled within 24 hours are non-refundable.
                Rescheduling is subject to availability.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="pt-4 flex justify-start">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
      </div>
    </div>
  )
}
