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
}

export default function PaymentSection({ formData, selectedSlot, nextStep, prevStep }: PaymentSectionProps) {
  const [amount, setAmount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const { userId, order } = await response.json()
      setAmount(order.amount / 100) // Optional: convert to rupees if you like

      if (!(window as any).Razorpay) {
         setLoading(false)
        alert("Razorpay SDK failed to load. Please try again later.")
        return
      }

      const razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: "INR",
        name: "Nereus",
        description: "Session Booking",
        image: "/logo.png",
        order_id: order.id,
        handler: function (response: any) {
          nextStep()
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.whatsapp,
        },
        notes: {
          userId: userId,
        },
        theme: {
          color: "#3399cc",
        },
         modal: {
        ondismiss: () => {
          setLoading(false)
        }
      },
      }

      const rzp = new (window as any).Razorpay(razorpayOptions)
      rzp.open()
    } catch (error) {
          
      console.error("Payment failed:", error)
      alert("Something went wrong while initiating payment.")
           setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-gray-800">Payment</h2>
        <p className="text-gray-500">Complete your booking with secure payment</p>
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
                    ₹{amount !== null ? (amount / 100).toFixed(2) : "1"}
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
