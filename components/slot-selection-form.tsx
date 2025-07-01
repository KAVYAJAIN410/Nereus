'use client'

import type React from "react"
import { useEffect, useState } from "react"
import type { FormData } from "./booking-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

interface SlotSelectionFormProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  setSelectedSlot: (slot: Slot | null) => void
}

interface DateGroup {
  date: string
  price?: number
  location: {
    name: string
    address: string
    link: string
  }
  timeSlots: RawSlot[]
}

interface RawSlot {
  id: string
  startTime: string
  endTime: string
}

interface Slot {
  id: string
  date: string
  location: {
    name: string
    address: string
    link: string
  }
  timeSlot: string
}

export default function SlotSelectionForm({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  setSelectedSlot,
}: SlotSelectionFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [dateGroups, setDateGroups] = useState<DateGroup[]>([])
  const [selectedDate, setSelectedDate] = useState<string>("")

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch("/api/slots")
        const data = await res.json()
        setDateGroups(data || [])
      } catch (error) {
        console.error("Failed to fetch slots", error)
      }
    }

    fetchSlots()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!selectedDate) newErrors.selectedDate = "Please select a date"
    if (!formData.timeSlotId) newErrors.timeSlotId = "Please select a time slot"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      nextStep()
    }
  }

  const selectedGroup = dateGroups.find(
    (group) => new Date(group.date).toDateString() === new Date(selectedDate).toDateString()
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-[#5cd2ec]">Choose Your Slot</h2>
        <p className="text-white">
          Available dates and locations will update live based on what’s open.
        </p>
      </div>

      <div className="space-y-4 text-white">
        {/* Date Selection as Scrollable Cards */}
        <div className="space-y-2">
          <Label>
            Select a Date <span className="text-red-500">*</span>
          </Label>
          {errors.selectedDate && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors.selectedDate}
            </p>
          )}

          <div className="flex overflow-x-auto space-x-4 py-2 no-scrollbar">
            {dateGroups.map((group) => {
              const isSelected = group.date === selectedDate
              return (
                <div
                  key={`${group.date}-${group.location.name}`}

                  className={`min-w-[250px] p-4 rounded-lg cursor-pointer border transition-all ${
                    isSelected
                      ? "bg-[#5cd2ec] text-white border-[#5cd2ec]"
                      : "bg-white text-gray-800"
                  }`}
                  onClick={() => {
                    setSelectedDate(group.date)
                    updateFormData({ timeSlotId: "" }) // reset time slot
                    setSelectedSlot(null)
                  }}
                >
                  <div className="font-semibold text-lg">
                    {new Date(group.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm"><span className="font-extrabold">Location:</span> {group.location.name}</div>
                  <div className="text-sm">₹{group.price ?? "N/A"}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Location Info */}
        {selectedGroup && (
          <div className="mt-2 bg-gray-50 p-4 rounded-md border border-gray-200 text-gray-700">
            <h3 className="text-lg font-semibold">Location Details</h3>
            <p><strong>Name:</strong> {selectedGroup.location.name}</p>
            <p><strong>Address:</strong> {selectedGroup.location.address}</p>
            <a
              href={selectedGroup.location.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-1 inline-block"
            >
              View on Google Maps
            </a>
          </div>
        )}

        {/* Time Slot Selection as Buttons */}
     {selectedGroup && selectedGroup.timeSlots && selectedGroup.timeSlots.length > 0 && (

          <div>
            <Label>
              Time Slot <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedGroup.timeSlots.map((slot) => {
                const slotLabel = `${new Date(slot.startTime).toLocaleTimeString()} - ${new Date(slot.endTime).toLocaleTimeString()}`
                return (
                  <button
                    key={slot.id}
                    type="button"
                    className={`px-4 py-2 rounded border ${
                      formData.timeSlotId === slot.id
                        ? "bg-[#5cd2ec] text-white border-[#5cd2ec]"
                        : "bg-white text-gray-800"
                    }`}
                    onClick={() => {
                      updateFormData({ timeSlotId: slot.id })
                      setSelectedSlot({
                        id: slot.id,
                        date: selectedGroup.date,
                        location: selectedGroup.location,
                        timeSlot: slotLabel
                      })
                    }}
                  >
                    {slotLabel}
                  </button>
                )
              })}
            </div>
            {errors.timeSlotId && (
              <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="h-4 w-4" /> {errors.timeSlotId}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit" className="bg-[#5cd2ec] text-white px-8">
          Next
        </Button>
      </div>
    </form>
  )
}
