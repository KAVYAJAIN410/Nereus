"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import PersonalDetailsForm from "./personal-details-form"
import SlotSelectionForm from "./slot-selection-form"
import ConsentForm from "./consent-form"
import PaymentSection from "./payment-section"
import ConfirmationPage from "./confirmation-page"
import ProgressSteps from "./progress-steps"

export type FormData = {
  fullName: string
  age: string
  gender: string
  whatsapp: string
  email: string
  medicalHistory: string
  whyMove: string
  fitnessGoal: string
  slotId:string
  consentAgreement: boolean
  ageConfirmation: boolean
}
interface Slot {
  id: string
  date: string
  location: string
  time: string
}
export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    age: "",
    gender: "",
    whatsapp: "",
    email: "",
    medicalHistory: "",
    whyMove: "",
    fitnessGoal: "",
    slotId:"",
    consentAgreement: false,
    ageConfirmation: false,
  })

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  return (
    <div className="space-y-8">
      {currentStep < 5 && <ProgressSteps currentStep={currentStep} />}

      <Card className="shadow-md">
        <CardContent className="pt-6">
          {currentStep === 1 && (
            <PersonalDetailsForm formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
          )}

          {currentStep === 2 && (
            <SlotSelectionForm
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
              setSelectedSlot={setSelectedSlot} // 🔥 pass this
            />
          )}

          {currentStep === 3 && (
            <ConsentForm formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
          )}

          {currentStep === 4 && <PaymentSection formData={formData} selectedSlot={selectedSlot} nextStep={nextStep} prevStep={prevStep}  />}

          {currentStep === 5 && <ConfirmationPage formData={formData} selectedSlot={selectedSlot} />}
        </CardContent>
      </Card>
    </div>
  )
}
