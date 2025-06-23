// app/pricing/page.tsx
"use client"

import Link from "next/link"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#5cd2ec] mb-4 text-center">Pricing</h1>
        <p className="text-gray-300 text-center mb-8">
          Tailored solutions, transparent pricing.
        </p>

        <div className="bg-[#121212] border border-[#222] rounded-xl p-6 shadow-md space-y-6">
          <p className="text-lg text-gray-300 leading-relaxed">
            At <span className="text-[#5cd2ec] font-semibold">Nereus Technologies</span>, pricing varies based on:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>⚙️ The <strong>service type</strong> you choose</li>
            <li>🎯 The <strong>level of customization</strong> required</li>
            <li>📆 The <strong>duration</strong> of the engagement</li>
          </ul>

          <p className="text-gray-300">
            To maintain fairness and flexibility, we price each service according to its scope and scale.
            Every client receives a personalized quote.
          </p>

          <p className="text-gray-300">
            We believe in <span className="text-[#5cd2ec] font-medium">complete transparency</span> — every quote is
            shared before service initiation and includes a detailed cost breakdown.
          </p>

          <div className="mt-6 text-center">
            <Link
              href="/contact"
              className="inline-block bg-[#5cd2ec] hover:bg-[#4bc0d8] text-black font-semibold px-6 py-3 rounded-lg transition"
            >
              Get Your Custom Quote
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          Questions? We’re always happy to discuss your requirements.
        </div>
      </div>
    </main>
  )
}
