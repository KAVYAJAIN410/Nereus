"use client"

export default function RefundPolicyPage() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-[#5cd2ec]">Refunds & Cancellation Policy</h1>
        <p className="text-sm text-gray-400">
          Issued by: Nereus Technologies Private Limited, Bengaluru, Karnataka, India
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">1. Purpose</h2>
        <p>
          This Refunds & Cancellation Policy (“Policy”) governs the terms under which refunds may be issued for participation in testing sessions (“Sessions”) conducted by Nereus Technologies Private Limited (“Company”, “we”, “our,” or “us”). By booking a Session and making a payment through our designated platform, you (“Participant”) agree to be bound by the terms set out herein.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">2. Event Cancellation by Company</h2>
        <p>
          If a scheduled Session is cancelled, rescheduled, or rendered non-operational by us due to logistical, operational, safety, or technical reasons, a full refund will be processed to the original payment method within 7 to 10 working days. Alternatively, the Participant may reschedule subject to availability.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">3. Cancellation by Participant</h2>
        <p>
          Cancellations made at least 24 hours prior to the scheduled Session are eligible for a full refund. Cancellations within 24 hours are non-refundable, unless due to verifiable medical emergencies—subject to the Company’s discretion.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">4. Non-Refundable Circumstances</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>No-shows or failure to attend</li>
          <li>Dissatisfaction with test outcomes or insights</li>
          <li>Voluntary withdrawal after session start</li>
          <li>Unmet personal goals or expectations</li>
          <li>Non-compliance with instructions or safety protocols</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">5. Refund Method and Timeline</h2>
        <p>
          Approved refunds will be processed to the original payment method (e.g., UPI, credit/debit card) within 7 to 10 working days from written confirmation.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">6. Contact for Cancellation or Refund</h2>
        <p>
          Please contact us at{" "}
          <a href="mailto:info@nereustechnologies.com" className="text-[#5cd2ec] underline">
            info@nereustechnologies.com
          </a>{" "}
          with the subject: <strong>Refund Request – [Your Full Name & Session Date]</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Full name of the Participant</li>
          <li>Date and time of the Session</li>
          <li>Reason for refund or cancellation</li>
          <li>Supporting documents, if applicable</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">7. Fraud, Abuse, and Exceptions</h2>
        <p>
          We reserve the right to deny refund requests that are fraudulent, abusive, or inconsistent with this Policy. No refunds for misuse of services or equipment. Repeated cancellations may lead to account suspension.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">8. Amendments</h2>
        <p>
          This Policy may be revised at any time without prior notice. The latest version will always be available on our website or upon request.
        </p>

        <p>
          By booking and making a payment, you confirm that you have read, understood, and agreed to this Refund & Cancellation Policy.
        </p>
      </div>
    </main>
  )
}
