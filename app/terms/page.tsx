"use client"

export default function TermsPage() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-[#5cd2ec]">Terms & Conditions</h1>
        <p className="text-sm text-gray-400">Last Updated: [Insert Date]</p>

        <p>
          This Terms and Conditions document (“Terms”) constitutes a binding agreement between the user (“you” or “Participant”) and Nereus Technologies Private Limited, a private limited company incorporated under the Companies Act, 2013, having its registered office at D-510, Sterling Residency, Dollars Colony, R.M.V. Extension II Stage, Bangalore North, Bangalore – 560094, Karnataka, India (“Company”, “we”, “us”, or “our”).
        </p>
        <p>
          By accessing our website or booking a session, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">1. Booking Eligibility</h2>
        <p>You must be at least eighteen (18) years old and legally competent to enter into a binding contract to book and participate in a session.</p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">2. Booking Process</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Accurately submit required personal details</li>
          <li>Select a preferred session date, time slot, and location</li>
          <li>Digitally accept the Consent and Data Usage Agreement</li>
          <li>Complete payment via our secure gateway (Razorpay)</li>
          <li>Receive confirmation via WhatsApp and/or email</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">3. Payments and Refunds</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Full refund for cancellations ≥ 24 hours before session</li>
          <li>No refund for cancellations &lt; 24 hours or no-shows</li>
          <li>Rescheduling is subject to availability and discretion</li>
          <li>No refund for dissatisfaction with subjective outcomes</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">4. Intellectual Property</h2>
        <p>
          All content—including branding, design, reports, and deliverables—are intellectual property of Nereus Technologies or its licensors. Unauthorized use is prohibited without prior written consent.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">5. Limitation of Liability</h2>
        <p>
          We do not guarantee specific outcomes from sessions. To the fullest extent permitted by law, we disclaim liability for injuries, dissatisfaction, or indirect damages arising from participation.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">6. Changes to Terms</h2>
        <p>
          We reserve the right to update these Terms at any time. Continued use of our services after changes implies acceptance of the revised Terms.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">7. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms are governed by Indian law. Disputes will be resolved via binding arbitration under the Arbitration and Conciliation Act, 1996. The venue is Bengaluru, Karnataka. Proceedings will be in English. Subject to arbitration, courts in Bengaluru have exclusive jurisdiction.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">8. Contact Information</h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:info@nereustechnologies.com" className="text-[#5cd2ec] underline">
            info@nereustechnologies.com
          </a>
          <br />
          <strong>Address:</strong> D-510, Sterling Residency, Dollars Colony, R.M.V. Extension II Stage,
          Bangalore North, Bangalore – 560094, Karnataka, India
        </p>
      </div>
    </main>
  )
}
