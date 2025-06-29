import React from 'react'

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-black bg-white">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-6">
        This Terms and Conditions document (“Terms”) constitutes a binding agreement between the user (“you” or “Participant”) and Nereus Technologies Private Limited, a private limited company incorporated under the Companies Act, 2013, having its registered office at D-510, Sterling Residency, Dollars Colony, R.M.V. Extension II Stage, Bangalore North, Bangalore – 560094, Karnataka, India (“Company”, “we”, “us”, or “our”).
        <br /><br />
        By accessing our website or booking a session, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Booking Eligibility</h2>
          <p>You must be at least eighteen (18) years of age and legally competent to enter into a binding contract in order to book and participate in a session.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Booking Process</h2>
          <p>To successfully complete your booking for a session with the Company, you must:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Accurately submit your full name, age, gender, WhatsApp number, email address, and any other required details;</li>
            <li>Select your preferred session date, time slot, and location from the available options;</li>
            <li>Read and digitally accept the Consent and Data Usage Agreement provided during the booking flow;</li>
            <li>Complete payment securely via our third-party payment gateway (Razorpay);</li>
            <li>Upon successful payment, you will receive booking confirmation and session details via WhatsApp and/or email.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Payments and Refunds</h2>
          <p>All payments for services are processed via Razorpay or another authorized payment gateway.
          By completing a payment, you expressly agree to our Refund & Cancellation Policy, which provides as follows:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Cancellations made by the Participant at least twenty-four (24) hours before the scheduled session are eligible for a full refund;</li>
            <li>Cancellations made within twenty-four (24) hours of the session are non-refundable;</li>
            <li>Rescheduling requests are subject to availability and at the discretion of the Company;</li>
            <li>No refunds will be issued for no-shows, incomplete sessions, voluntary withdrawal, or dissatisfaction with subjective outcomes.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
          <p>All content on the Company’s website, booking interface, reports, and any other deliverables—including text, branding, graphics, interface design, layout, logos, and proprietary systems—are the intellectual property of Nereus Technologies Private Limited or its licensors.
          No part of this content may be copied, reproduced, republished, uploaded, posted, transmitted, distributed, or used in any manner without the prior written consent of the Company.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
          <p>The Company does not warrant or guarantee any specific athletic, therapeutic, medical, or performance-based outcomes resulting from participation in a session.
          To the maximum extent permitted under applicable law, the Company disclaims any liability for incidental, indirect, special, punitive, or consequential damages, including but not limited to injury, fatigue, dissatisfaction, or misinterpretation of insights derived from your session.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
          <p>The Company reserves the right to modify, amend, or replace these Terms at any time without prior notice. Any changes will be posted on this page and shall become effective immediately upon publication. Continued use of the website or services following such changes shall constitute your acceptance of the modified Terms.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Governing Law and Dispute Resolution</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of India.
          Any disputes or claims arising out of or in connection with these Terms shall be resolved through binding arbitration conducted in accordance with the provisions of the Arbitration and Conciliation Act, 1996, as amended. The seat and venue of arbitration shall be Bengaluru, Karnataka, and the language of the proceedings shall be English.
          Subject to the arbitration clause above, the courts in Bengaluru, Karnataka shall have exclusive jurisdiction.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. Contact Information</h2>
          <p>For any queries, clarifications, or concerns regarding these Terms, you may contact us at:</p>
          <p>Email: info@nereustechnologies.com<br />
          Postal Address: D-510, Sterling Residency, Dollars Colony, R.M.V. Extension II Stage, Bangalore North, Bangalore – 560094, Karnataka, India</p>
        </div>
      </div>
    </div>
  )
}
