import { CheckCircle } from "lucide-react"

interface ProgressStepsProps {
  currentStep: number
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = ["Your Details", "Choose Your Slot", "Consent & Agreements", "Payment"]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep > index + 1
                  ? "bg-[#5cd2ec] border-[#5cd2ec] text-white"
                  : currentStep === index + 1
                    ? "border-[#5cd2ec] text-[#5cd2ec]"
                    : "border-gray-300 text-gray-300"
              }`}
            >
              {currentStep > index + 1 ? <CheckCircle className="w-6 h-6" /> : index + 1}
            </div>
            <span
              className={`mt-2 text-xs sm:text-sm hidden xs:visible ${
                currentStep === index + 1
                  ? "text-[#5cd2ec] font-medium"
                  : currentStep > index + 1
                    ? "text-[#5cd2ec]"
                    : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="relative flex items-center justify-between mt-3">
        {steps.map((_, index) => {
          if (index < steps.length - 1) {
            return (
              <div key={index} className={`flex-1 h-1 ${currentStep > index + 1 ? "bg-[#5cd2ec]" : "bg-gray-200"}`} />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
