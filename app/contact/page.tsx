// app/contact/page.tsx
"use client"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#5cd2ec] mb-4 text-center">Contact Us</h1>
        <p className="text-gray-300 text-center mb-10">
          We're here to help. Reach out to us with any questions, feedback, or support needs.
        </p>

        <div className="bg-[#121212] border border-[#222] rounded-xl p-6 shadow-md space-y-6">
          {/* Email */}
          <div>
            <h2 className="text-xl font-semibold text-[#5cd2ec]">📧 Email</h2>
            <a
              href="mailto:info@nereustechnologies.com"
              className="text-gray-300 mt-1 block hover:underline hover:text-[#5cd2ec]"
            >
              info@nereustechnologies.com
            </a>
          </div>

          {/* Phone Numbers */}
          <div>
            <h2 className="text-xl font-semibold text-[#5cd2ec]">📞 Phone Numbers</h2>
            <a href="tel:+919108973510" className="text-gray-300 block hover:underline hover:text-[#5cd2ec] mt-1">
              +91 91089 73510
            </a>
            <a href="tel:+919840596798" className="text-gray-300 block hover:underline hover:text-[#5cd2ec]">
              +91 98405 96798
            </a>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-xl font-semibold text-[#5cd2ec]">📍 Location</h2>
            <a
              href="https://www.google.com/maps/place/Bengaluru,+Karnataka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 mt-1 block hover:underline hover:text-[#5cd2ec]"
            >
              Bengaluru, India
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            We typically respond within 24 hours. Thank you for reaching out to Nereus Technologies.
          </p>
        </div>
      </div>
    </main>
  )
}
