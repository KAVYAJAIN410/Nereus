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
            By proceeding with this booking, you acknowledge that your session includes a physical performance test conducted by trained professionals. Participation is voluntary and at your own risk.

          </p>
          <p>
            During the session, we collect personal, physiological, and movement-related data to generate performance insights and improve our system. This data is securely stored, kept confidential, and never sold. Your information may be anonymized and used for research, benchmarking, and system development.

          </p>
          <p>
          You may access or delete your personal data by contacting us. Refunds are available only under specific conditions outlined in our policy.

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
             I have read, understood, and voluntarily agree to the terms of this Master Participation & Consent Agreement. 

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
