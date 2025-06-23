"use client"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 flex items-center justify-center">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        <h1 className="text-4xl font-bold text-[#5cd2ec]">About Nereus</h1>

        <p className="text-xl text-gray-300 leading-8">
          <span className="text-white font-semibold">Nereus</span> is not your average fitness checkup. We decode how your body moves, performs, and adapts—transforming raw biological signals into deeply personal, actionable insights.
        </p>

        <p className="text-xl text-gray-300 leading-8">
          In just <span className="text-white font-semibold">45 minutes</span>, our cutting-edge sensors and performance science deliver your <span className="text-white font-semibold">Athletic Blueprint</span>—a customized physiological map to help you move smarter, perform better, and train with purpose.
        </p>

        <p className="text-xl text-gray-300 leading-8">
          This isn’t a fitness test. It’s a window into your inner mechanics—your first step toward unlocking peak potential.
        </p>
      </div>
    </main>
  )
}
