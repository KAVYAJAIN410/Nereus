import type { FormData } from "./booking-form"
import { CheckCircle } from "lucide-react"

interface Slot {
  id: string
  date: string
  location: string
  time: string
}

interface ConfirmationPageProps {
  formData: FormData
  selectedSlot: Slot | null
}

export default function ConfirmationPage({ formData, selectedSlot }: ConfirmationPageProps) {
  return (
    <div className="text-center py-8 space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-emerald-100 p-3">
          <CheckCircle className="h-12 w-12 text-emerald-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Thank You!</h2>
        <p className="text-gray-600">Payment received. You're officially in. Your slot is confirmed for:</p>
      </div>

      <div className="max-w-xs mx-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{selectedSlot?.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">{selectedSlot?.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{selectedSlot?.time}</span>
          </div>
        </div>
      </div>

      <p className="text-lg font-medium text-gray-800 pt-4">
        This is where your potential stops hiding. See you there.
      </p>

      <div className="pt-6">
        <p className="text-sm text-gray-500">A confirmation email has been sent to {formData.email}</p>
      </div>
    </div>
  )
}
