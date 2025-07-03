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

interface RawSlot {
  id: string
  startTime: string
  endTime: string
}

interface SlotDateGroup {
  date: string
  price?: number
  location: {
    id: string
    name: string
    address: string
    link: string
  }
  timeSlots: RawSlot[]
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
  const [dateGroups, setDateGroups] = useState<SlotDateGroup[]>([])
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedLocationId, setSelectedLocationId] = useState("")

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch("/api/slots")
        const data = await res.json()
         console.log(data)
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
    if (!selectedLocationId) newErrors.selectedLocationId = "Please select a location"
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

  // Filter available locations for selected date
  const availableLocations = dateGroups
    .filter(group => new Date(group.date).toDateString() === new Date(selectedDate).toDateString())

  const selectedGroup = availableLocations.find(group => group.location.id === selectedLocationId)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#5cd2ec]">Choose Your Slot</h2>
      <p className="text-white">First choose a date, then a location, and finally a time slot.</p>

      {/* Date Dropdown */}
      <div className="text-white">
        <Label>Date <span className="text-red-500">*</span></Label>
        <select
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value)
            setSelectedLocationId("")
            updateFormData({ timeSlotId: "" })
            setSelectedSlot(null)
          }}
          className="w-full mt-1 p-2 rounded bg-white text-black"
        >
          <option value="">-- Select Date --</option>
          {[...new Set(dateGroups.map(group => group.date))].map(date => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString()}
            </option>
          ))}
        </select>
        {errors.selectedDate && <p className="text-sm text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="h-4 w-4" /> {errors.selectedDate}</p>}
      </div>

      {/* Location Dropdown */}
      {selectedDate && (
        <div className="text-white">
          <Label>Location <span className="text-red-500">*</span></Label>
          <select
            value={selectedLocationId}
            onChange={(e) => {
              setSelectedLocationId(e.target.value)
              updateFormData({ timeSlotId: "" })
              setSelectedSlot(null)
            }}
            className="w-full mt-1 p-2 rounded bg-white text-black"
          >
            <option value="">-- Select Location --</option>
            {availableLocations.map(group => (
              <option key={group.location.id} value={group.location.id}>
                {group.location.name}
              </option>
            ))}
          </select>
          {errors.selectedLocationId && <p className="text-sm text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="h-4 w-4" /> {errors.selectedLocationId}</p>}
        </div>
      )}

      {/* Location Info */}
      {selectedGroup && (
        <div className="mt-2 bg-gray-50 p-4 rounded-md border border-gray-200 text-gray-700">
          <h3 className="text-lg font-semibold">Location Details</h3>
          <p><strong>Name:</strong> {selectedGroup.location.name}</p>
          <p><strong>Address:</strong> {selectedGroup.location.address}</p>
          <a href={selectedGroup.location.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-1 inline-block">
            View on Google Maps
          </a>
        </div>
      )}

      {/* Time Slot Buttons */}
      {selectedGroup && selectedGroup.timeSlots.length > 0 && (
        <div className="text-white">
          <Label>Time Slot <span className="text-red-500">*</span></Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedGroup.timeSlots.map(slot => {
              const slotLabel = `${new Date(slot.startTime).toLocaleTimeString()} - ${new Date(slot.endTime).toLocaleTimeString()}`
              return (
                <button
                  key={slot.id}
                  type="button"
                  className={`px-4 py-2 rounded border ${
                    formData.timeSlotId === slot.id ? "bg-[#5cd2ec] text-white border-[#5cd2ec]" : "bg-white text-gray-800"
                  }`}
                  onClick={() => {
                    updateFormData({ timeSlotId: slot.id })
                    setSelectedSlot({
                      id: slot.id,
                      date: selectedDate,
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
          {errors.timeSlotId && <p className="text-sm text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="h-4 w-4" /> {errors.timeSlotId}</p>}
        </div>
      )}

      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
        <Button type="submit" className="bg-[#5cd2ec] text-white px-8">Next</Button>
      </div>
    </form>
  )
}
