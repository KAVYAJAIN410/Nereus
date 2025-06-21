"use client"

import type React from "react"
import { useState } from "react"
import type { FormData } from "./booking-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

interface PersonalDetailsFormProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
}

export default function PersonalDetailsForm({ formData, updateFormData, nextStep }: PersonalDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isFirstSession, setIsFirstSession] = useState<string>("")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.age.trim()) {
      newErrors.age = "Age is required"
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 18) {
  newErrors.age = "Age must be 18 or older"
}
if (!formData.userSessionNo || Number(formData.userSessionNo) < 1) {
  newErrors.sessionNumber = "Session number must be 1 or more"
}
    if (!formData.gender) newErrors.gender = "Please select your gender"
    if (!formData.whatsapp.trim()) {
  newErrors.whatsapp = "WhatsApp number is required"
} else if (!/^\d{10}$/.test(formData.whatsapp.trim())) {
  newErrors.whatsapp = "WhatsApp number must be exactly 10 digits"
}
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.whyMove.trim()) newErrors.whyMove = "This field is required"
    if (!formData.fitnessGoal.trim()) newErrors.fitnessGoal = "This field is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) nextStep()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-transparent">

      {/* Section 1: Personal Details */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#5cd2ec]">Step 1: Your Details</h2>
        <p className="text-white">Let’s start with the basics. Tell us about yourself.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2 text-white">
          <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            placeholder="Enter your full name"
            className="bg-[#181414] border-gray-700"
          />
          {errors.fullName && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.fullName}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          <div className="space-y-2">
            <Label htmlFor="age">Age <span className="text-red-500">*</span></Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => updateFormData({ age: e.target.value })}
              placeholder="Enter your age"
              className="bg-[#181414] border-gray-700"
            />
            {errors.age && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.age}</p>}
          </div>
<div className="space-y-2 text-white">
  <Label htmlFor="gender">
    Gender <span className="text-red-500">*</span>
  </Label>
  <div className="relative">
    <select
      id="gender"
      value={formData.gender}
      onChange={(e) => updateFormData({ gender: e.target.value })}
      className="appearance-none w-full bg-[#181414] border border-gray-700 text-white rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#5cd2ec] focus:border-[#5cd2ec]"
    >
      <option value="">Select gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>

    {/* Custom dropdown arrow */}
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
      ▼
    </div>
  </div>

  {errors.gender && (
    <p className="text-sm text-red-500 flex items-center gap-1">
      <AlertCircle className="h-4 w-4" /> {errors.gender}
    </p>
  )}
</div>
        </div>
      </div>

      {/* Section Divider */}
      <hr className="border-gray-700 my-6" />

      {/* Section 2: Contact Info */}
      <div className="space-y-2 text-white">
  <Label htmlFor="sessionNumber">Session Number <span className="text-red-500">*</span></Label>
  <Input
    id="sessionNumber"
    type="number"
    min={1}
    value={formData.userSessionNo ?? ""}
    onChange={(e) => updateFormData({ userSessionNo: Number(e.target.value) || 1 })}
    placeholder="Enter your session number"
    className="bg-[#181414] border-gray-700"
  />
  {errors.sessionNumber && (
    <p className="text-sm text-red-500 flex items-center gap-1">
      <AlertCircle className="h-4 w-4" /> {errors.sessionNumber}
    </p>
  )}
</div>

      <div className="space-y-2 pt-4">
        <h2 className="text-xl font-semibold text-[#5cd2ec]">How we’ll contact you</h2>
        <p className="text-white">We’ll use these to send session updates, reports, and more.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp Number <span className="text-red-500">*</span></Label>
          <Input
            id="whatsapp"
            value={formData.whatsapp}
            onChange={(e) => updateFormData({ whatsapp: e.target.value })}
            placeholder="Enter your WhatsApp number"
            className="bg-[#181414] border-gray-700"
          />
          {errors.whatsapp && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.whatsapp}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email ID <span className="text-red-500">*</span></Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="Enter your email address"
            className="bg-[#181414] border-gray-700"
          />
          {errors.email && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2 text-white">
        <Label htmlFor="medicalHistory">History of injuries or medical conditions (optional)</Label>
        <Textarea
          id="medicalHistory"
          value={formData.medicalHistory}
          onChange={(e) => updateFormData({ medicalHistory: e.target.value })}
          placeholder="Please share any relevant medical history"
          className="min-h-[100px] bg-[#181414] border-gray-700"
        />
      </div>

      {/* Section Divider */}
      <hr className="border-gray-700 my-6" />

      {/* Section 3: Motivation */}
      <div className="space-y-2 pt-4">
        <h2 className="text-xl font-semibold text-[#5cd2ec]">What drives you</h2>
        <p className="text-white">Understanding your ‘why’ helps us shape your experience better.</p>
      </div>

      <div className="space-y-2 text-white">
        <Label htmlFor="whyMove">Why do you move? <span className="text-red-500">*</span></Label>
        <Textarea
          id="whyMove"
          value={formData.whyMove}
          onChange={(e) => updateFormData({ whyMove: e.target.value })}
          placeholder="Tell us why physical movement is important to you"
          className="min-h-[100px] bg-[#181414] border-gray-700"
        />
        {errors.whyMove && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.whyMove}</p>}
      </div>

      <div className="space-y-2 text-white">
        <Label htmlFor="fitnessGoal">What's your next fitness goal? <span className="text-red-500">*</span></Label>
        <Textarea
          id="fitnessGoal"
          value={formData.fitnessGoal}
          onChange={(e) => updateFormData({ fitnessGoal: e.target.value })}
          placeholder="Share your fitness aspirations"
          className="min-h-[100px] bg-[#181414] border-gray-700"
        />
        {errors.fitnessGoal && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.fitnessGoal}</p>}
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" className="bg-[#5cd2ec] text-black px-8">Next</Button>
      </div>
    </form>
  )
}
