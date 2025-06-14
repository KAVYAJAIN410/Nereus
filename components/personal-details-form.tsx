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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required"
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = "Please enter a valid age"
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender"
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.whyMove.trim()) {
      newErrors.whyMove = "This field is required"
    }

    if (!formData.fitnessGoal.trim()) {
      newErrors.fitnessGoal = "This field is required"
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
        <h2 className="text-2xl font-semibold text-gray-800">Your Details</h2>
        <p className="text-gray-500">Please provide your personal information</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors.fullName}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">
              Age <span className="text-red-500">*</span>
            </Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => updateFormData({ age: e.target.value })}
              placeholder="Enter your age"
            />
            {errors.age && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.age}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">
              Gender <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.gender}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp">
              WhatsApp Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => updateFormData({ whatsapp: e.target.value })}
              placeholder="Enter your WhatsApp number"
            />
            {errors.whatsapp && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.whatsapp}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email ID <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicalHistory">History of injuries or medical conditions (optional)</Label>
          <Textarea
            id="medicalHistory"
            value={formData.medicalHistory}
            onChange={(e) => updateFormData({ medicalHistory: e.target.value })}
            placeholder="Please share any relevant medical history"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whyMove">
            Why do you move? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="whyMove"
            value={formData.whyMove}
            onChange={(e) => updateFormData({ whyMove: e.target.value })}
            placeholder="Tell us why physical movement is important to you"
            className="min-h-[100px]"
          />
          {errors.whyMove && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors.whyMove}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fitnessGoal">
            What's your next fitness goal? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="fitnessGoal"
            value={formData.fitnessGoal}
            onChange={(e) => updateFormData({ fitnessGoal: e.target.value })}
            placeholder="Share your fitness aspirations"
            className="min-h-[100px]"
          />
          {errors.fitnessGoal && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors.fitnessGoal}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
          Next
        </Button>
      </div>
    </form>
  )
}
