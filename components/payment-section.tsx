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
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 min in seconds

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Timer countdown and expiry logic
  useEffect(() => {
    if (timeLeft <= 0) {
      nextStep() // Automatically go to next step
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handlePayment = async () => {
    setLoading(true)
    try {
      console.log(formData)
      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) {
        alert(data.error || "Something went wrong. Please try again.")
        setLoading(false)
        prevStep()
        return
      }

      const order = data.order
      setAmount(order.amount / 100)

      if (!(window as any).Razorpay) {
        alert("Razorpay SDK failed to load.")
        setLoading(false)
        return
      }

      const razorpayOptions = {
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
      }

      const rzp = new (window as any).Razorpay(razorpayOptions)
      rzp.open()
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong while initiating payment.")
      setLoading(false)
    }
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`

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
                  <span className="font-medium">{selectedSlot?.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{selectedSlot?.location?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{selectedSlot?.timeSlot}</span>
                </div>
                <div className="border-t my-2 pt-2 flex justify-between">
                  <span className="font-medium">Total Amount:</span>
                  <span className="font-bold">
                    ₹{amount !== null ? amount.toFixed(2) : "1"}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-red-600 font-medium">
              Please complete payment within{" "}
              <span className="font-semibold">{formattedTime}</span>. You’ll be redirected after that.
            </p>

            <Button
              onClick={handlePayment}
              disabled={loading || timeLeft <= 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Processing...
                </>
              ) : timeLeft <= 0 ? (
                "Redirecting..."
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
