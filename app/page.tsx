"use client"

import { useState } from "react"
import BookingForm from "@/components/booking-form"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function Home() {
  const [showForm, setShowForm] = useState(false)

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className={`w-full max-w-3xl transition-all duration-300 ${showForm ? "mt-28" : "mt-52"}`}>

        {/* Logo + Heading */}
        <div className={`flex items-center justify-center text-center flex-col sm:flex-row ${showForm ? "space-y-2 sm:space-y-0 sm:space-x-4" : "space-y-4"}`}>
          <Image
            src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27UTF-8%27?%3e%3csvg%20id=%27Layer_2%27%20data-name=%27Layer%202%27%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2057.68%2063.14%27%3e%3cdefs%3e%3cstyle%3e%20.cls-1%20{%20fill:%20%235bd2ec;%20stroke-width:%200px;%20}%20%3c/style%3e%3c/defs%3e%3cg%20id=%27pg1%27%3e%3cg%3e%3cpath%20class=%27cls-1%27%20d=%27m29.21,47.25c.18.1.18.37,0,.47l-24.42,14.94c-2.28,1.4-5.16-.51-4.76-3.16l2.77-18.22c0-.08.05-.15.12-.19l6.81-4.5c.44-.29,1.01-.31,1.47-.04l18.01,10.68Z%27/%3e%3cpath%20class=%27cls-1%27%20d=%27m54.37,25.85l-2.86,20.82c-.72,5.22-6.54,8.02-11.06,5.31l-28.57-17.1c-.92-.55-2.07-.52-2.95.07l-5.38,3.57c-.2.13-.46-.03-.42-.27l2.87-20.88c.72-5.21,6.51-8,11.03-5.32l28.8,17.09c.92.55,2.07.51,2.96-.08l5.15-3.48c.2-.13.46.03.43.27Z%27/%3e%3cpath%20class=%27cls-1%27%20d=%27m57.64,3.61l-2.74,18.94c-.01.08-.05.14-.12.19l-6.77,4.56c-.44.3-1.01.32-1.47.05l-18.11-10.52c-.18-.1-.18-.36-.01-.47L52.81.52c2.27-1.47,5.22.41,4.83,3.09Z%27/%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
            alt="Company Logo"
            width={showForm ? 40 : 60}
            height={showForm ? 40 : 60}
            priority
          />

          <h1
            className={`font-bold text-white text-center leading-tight ${
              showForm ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"
            }`}
            style={{ fontFamily: "Gerante" }}
          >
            Welcome to The<br className="sm:hidden" /> Nereus Experience.
          </h1>
        </div>

        {/* Arrow Button */}
        {!showForm && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-[#5cd2ec] text-black px-6 py-3 rounded-full font-semibold text-base sm:text-lg"
            >
              Book Now
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        )}

        {/* Booking Form */}
        {showForm && (
          <div className="mt-16 text-left">
            <BookingForm />
          </div>
        )}
      </div>
    </main>
  )
}
