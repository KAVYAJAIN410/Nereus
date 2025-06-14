"use client"

import type React from "react"

import { useState } from "react"
import type { FormData } from "./booking-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
        <h2 className="text-2xl font-semibold text-gray-800">Consent & Agreements</h2>
        <p className="text-gray-500">Please review and accept our terms</p>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-navy-600 p-0">
                View Terms and Conditions
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Terms and Conditions</DialogTitle>
                <DialogDescription>Please read our terms and conditions carefully</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <h3 className="font-semibold text-base">1. Introduction</h3>
                <p>
                  These Terms and Conditions govern your use of our wellness test services. By booking and participating
                  in our wellness test, you agree to be bound by these Terms and Conditions.
                </p>

                <h3 className="font-semibold text-base">2. Service Description</h3>
                <p>
                  Our wellness test is designed to assess various aspects of your physical fitness and health. The test
                  is conducted by qualified professionals and includes various physical assessments.
                </p>

                <h3 className="font-semibold text-base">3. Booking and Payment</h3>
                <p>
                  Booking is subject to availability. Payment must be made in full at the time of booking. We accept
                  payment through our secure payment gateway.
                </p>

                <h3 className="font-semibold text-base">4. Cancellation and Refunds</h3>
                <p>
                  Cancellations made more than 24 hours before the scheduled session may be eligible for a refund or
                  rescheduling. Cancellations within 24 hours of the scheduled session are non-refundable.
                </p>

                <h3 className="font-semibold text-base">5. Health and Safety</h3>
                <p>
                  You are responsible for ensuring that you are physically capable of participating in the wellness
                  test. If you have any medical conditions or concerns, please consult with a healthcare professional
                  before booking.
                </p>

                <h3 className="font-semibold text-base">6. Data Protection</h3>
                <p>
                  We collect and process personal data in accordance with our Privacy Policy. By booking a wellness
                  test, you consent to the collection and processing of your personal data for the purposes of providing
                  our services.
                </p>

                <h3 className="font-semibold text-base">7. Liability</h3>
                <p>
                  We take all reasonable precautions to ensure your safety during the wellness test. However, you
                  participate at your own risk. We are not liable for any injuries or damages that may occur during the
                  test.
                </p>

                <h3 className="font-semibold text-base">8. Changes to Terms</h3>
                <p>
                  We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective
                  immediately upon posting on our website.
                </p>

                <h3 className="font-semibold text-base">9. Contact Information</h3>
                <p>
                  If you have any questions or concerns about these Terms and Conditions, please contact us at
                  support@wellnesstest.com.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
          Proceed to Payment
        </Button>
      </div>
    </form>
  )
}
