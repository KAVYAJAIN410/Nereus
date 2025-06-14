"use client"

import type React from "react"
import { useEffect, useState } from "react"
import type { FormData } from "./booking-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

interface SlotSelectionFormProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  setSelectedSlot: (slot: Slot | null) => void 
}

interface Slot {
  id: string
  date: string
  location: { name: string }
  timeSlot: string
}

export default function SlotSelectionForm({ formData, updateFormData, nextStep, prevStep, setSelectedSlot }: SlotSelectionFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([])
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch("/api/slots")
        const data = await res.json()
setAvailableSlots(data || [])
  console.log(availableSlots);
      } catch (error) {
        console.error("Failed to fetch slots", error)
      }
    }

    fetchSlots()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.slotId) {
      newErrors.slotId = "Please select a slot"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      nextStep()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-gray-800">Choose Your Slot</h2>
        <p className="text-gray-500">Select your preferred date, location, and time</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="slot">
            Slot <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.slotId}
             onValueChange={(value) => {
    updateFormData({ slotId: value })
    const selected = availableSlots.find((s) => s.id === value)
    setSelectedSlot(selected ?? null)
  }}
            
          >
            <SelectTrigger id="slot">
              <SelectValue placeholder="Select a slot" />
            </SelectTrigger>
            <SelectContent>
              {availableSlots.map((slot) => (
  <SelectItem key={slot.id} value={slot.id}>
    {new Date(slot.date).toLocaleDateString()} — {slot.location.name} — {slot.timeSlot}
  </SelectItem>
))}

            </SelectContent>
          </Select>
          {errors.slotId && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors.slotId}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
          Next
        </Button>
      </div>
    </form>
  )
}
