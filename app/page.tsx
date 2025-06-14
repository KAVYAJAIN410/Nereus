"use client"
import BookingForm from "@/components/booking-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Welcome to your Nereus Experience.  </h1>
          <p className="mt-3 text-xl text-gray-500">Book your personalized wellness assessment session</p>
        </div>
        <BookingForm />
      </div>
    </main>
  )
}
