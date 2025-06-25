"use client"

import type React from "react"
import { useState } from "react"
import type { FormData } from "./booking-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface ConsentFormProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export default function ConsentForm({ formData, updateFormData, nextStep, prevStep }: ConsentFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.consentAgreement) {
      newErrors.consentAgreement = "You must agree to the consent and data usage agreement"
    }

    if (!formData.ageConfirmation) {
      newErrors.ageConfirmation = "You must confirm you are above 18 years of age"
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
        <h2 className="text-2xl font-semibold text-[#5cd2ec]">Consent & Agreements</h2>
        <p className="text-white">Please review and accept our terms</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
        <div className="text-sm text-gray-700 space-y-4">
          <p>
            By proceeding with this booking, you acknowledge that the wellness test involves physical activity
            assessment. Our qualified professionals will guide you through the process, but you participate at your own
            risk.
          </p>
          <p>
            The data collected during your assessment will be used to provide personalized recommendations. We maintain
            strict confidentiality of all personal information in accordance with data protection regulations.
          </p>
          <p>
            You have the right to request access to your data or its deletion at any time by contacting our support
            team.
          </p>
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="consentAgreement"
            checked={formData.consentAgreement}
            onCheckedChange={(checked) => updateFormData({ consentAgreement: checked as boolean })}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="consentAgreement"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and understood the Consent and Data Usage Agreement above and agree to all terms therein.
            </Label>
            {errors.consentAgreement && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.consentAgreement}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="ageConfirmation"
            checked={formData.ageConfirmation}
            onCheckedChange={(checked) => updateFormData({ ageConfirmation: checked as boolean })}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="ageConfirmation"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I confirm I am above 18 years of age and legally competent to provide this consent.
            </Label>
            {errors.ageConfirmation && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.ageConfirmation}
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
           <Link
    href="/CompanyTerms"
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm font-medium text-[#5cd2ec] hover:underline"
  >
            View Terms and Conditions
          </Link>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit" className="bg-[#5cd2ec] text-white px-8">
          Proceed to Payment
        </Button>
      </div>
    </form>
  )
}
