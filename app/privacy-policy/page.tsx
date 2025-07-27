// app/privacy-policy/page.tsx
"use client"

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-[#5cd2ec]">Privacy Policy</h1>
       
        
        <p>
          This Privacy Policy (“Policy”) is issued by Nereus Technologies Private Limited, a private limited company
          incorporated under the Companies Act, 2013, having its registered office at D-510, Sterling Residency, Dollars
          Colony, R.M.V. Extension II Stage, Bangalore North, Bangalore – 560094, Karnataka, India (“Company”, “we”,
          “us”, or “our”).
        </p>
        <p>
          This Policy governs the collection, storage, use, disclosure, and protection of personal information provided
          by individuals (“you” or “User”) when accessing our website or booking a session. By using our website and
          submitting information through our booking platform, you consent to the practices described herein.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Personal Information:</strong> Full name, age, gender, email address, and WhatsApp number</li>
          <li><strong>Optional Disclosures:</strong> Past injuries or medical conditions</li>
          <li><strong>Motivational Inputs:</strong> “Why do you move?” and fitness goals</li>
          <li><strong>Session Preferences:</strong> Date, time, and location of session booking</li>
          <li><strong>Technical Data:</strong> IP address, device info, browser type, navigation behavior</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">2. Purpose of Collection</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>To facilitate and confirm bookings</li>
          <li>To communicate updates via WhatsApp/email</li>
          <li>To understand user motivations and improve services</li>
          <li>To enhance website performance</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">3. Legal Basis for Processing</h2>
        <p>
          We process your data based on your express consent or to fulfill contractual obligations.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">4. Data Sharing and Disclosure</h2>
        <p>
          We do not sell, rent, or trade personal data. We may share with:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Internal staff under confidentiality</li>
          <li>Authorized service providers</li>
          <li>Law enforcement if legally mandated</li>
        </ul>
        <p>
          Aggregated and anonymized data may be used for internal research or investor updates.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">5. Data Security and Storage</h2>
        <p>
          Data is stored on encrypted, access-controlled infrastructure. Only authorized personnel may access it.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">6. Data Retention</h2>
        <p>
          We retain data only as long as needed. It is deleted or anonymized once no longer required.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">7. User Rights</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Access your personal data</li>
          <li>Correct or delete inaccurate data</li>
          <li>Withdraw consent before a session</li>
          <li>File a complaint with a regulatory authority</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">8. Cookies and Analytics</h2>
        <p>
          We use cookies and analytics tools to improve user experience. You may disable cookies in your browser.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">9. Policy Updates</h2>
        <p>
          Changes to this Policy will be posted here. Continued use signifies acceptance of updates.
        </p>

        <h2 className="text-xl font-semibold text-[#5cd2ec]">10. Contact Information</h2>
        <p>
          For questions or concerns, reach out to us:
          <br />
          <strong>Email:</strong>{" "}
          <a href="mailto:info@nereustechnologies.com" className="text-[#5cd2ec] underline">
            info@nereustechnologies.com
          </a>
          <br />
          <strong>Postal Address:</strong> D-510, Sterling Residency, Dollars Colony, R.M.V. Extension II Stage,
          Bangalore North, Bangalore – 560094, Karnataka, India
        </p>
      </div>
    </main>
  )
}
