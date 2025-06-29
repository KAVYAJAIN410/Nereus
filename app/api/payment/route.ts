import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

import { getRedisClient } from "../../../lib/redis"
import { formatInTimeZone } from "date-fns-tz"

export async function POST(request: NextRequest) {
  console.log("✅ Received Razorpay webhook")
  let tempEntry = null

  try {
    const redis = await getRedisClient()
    const payload = await request.json()

    const paymentEntity = payload?.payload?.payment?.entity
    const orderId = paymentEntity?.order_id
    const paymentId = paymentEntity?.id
    const tempId = paymentEntity?.notes?.tempId

    if (!orderId || !paymentId || !tempId) {
      return new NextResponse("Missing orderId, paymentId, or tempId", { status: 400 })
    }

    // ✅ Fetch temp entry with related slot
    tempEntry = await prisma.temp.findUnique({
      where: { id: tempId },
      select: {
        SessionNo: true,
        timeSlotId: true,
        consentAgreement: true,
        ageConfirmation: true,
        fullName: true,
        age: true,
        gender: true,
        email: true,
        whatsapp: true,
        medicalHistory: true,
        whyMove: true,
        fitnessGoal: true,
        id: true,
        timeSlot: {
          select: {
            startTime: true,
            endTime: true,
            slotDate: {
              select: { date: true },
            },
          },
        },
      },
    })

    if (!tempEntry) {
      return new NextResponse("Temp data not found", { status: 404 })
    }

const existingUser = await prisma.client.findFirst({
  where: {
    whatsapp: tempEntry.whatsapp,
    fullName: {
      equals: tempEntry.fullName,
      mode: 'insensitive', // 👈 makes it case-insensitive
    },
  },
})


let user

if (existingUser) {
  // Update existing user
  user = await prisma.client.update({
    where: { id: existingUser.id },
    data: {
      age: tempEntry.age,
      gender: tempEntry.gender,
      email: tempEntry.email,
      whatsapp: tempEntry.whatsapp,
      medicalHistory: tempEntry.medicalHistory,
      whyMove: tempEntry.whyMove,
      fitnessGoal: tempEntry.fitnessGoal,
    },
  })
} else {
  // Create new user with new unique ID
  const userCount = await prisma.client.count()
  const uniqueId = `NT-${(userCount + 1).toString().padStart(4, "0")}`

  user = await prisma.client.create({
    data: {
      fullName: tempEntry.fullName,
      age: tempEntry.age,
      gender: tempEntry.gender,
      email: tempEntry.email,
      whatsapp: tempEntry.whatsapp,
      medicalHistory: tempEntry.medicalHistory,
      whyMove: tempEntry.whyMove,
      fitnessGoal: tempEntry.fitnessGoal,
      uniqueId,
    },
  })
}

    // ✅ Update slot count
    await prisma.timeSlot.update({
      where: { id: tempEntry.timeSlotId },
      data: { count: { decrement: 1 } },
    })

    // ✅ Remove Redis lock
    const redisKey = `lock:slot:${tempEntry.timeSlotId}`
    await redis.decr(redisKey)

    // ✅ Create booking
    await prisma.booking.create({
      data: {
        orderId,
        clientId: user.id,
        consentAgreement: tempEntry.consentAgreement,
        ageConfirmation: tempEntry.ageConfirmation,
        timeSlotId: tempEntry.timeSlotId,
        clientSessionNo: tempEntry.SessionNo,
        paymentStatus: "PAID",
        paymentId,
      },
    })

    // ✅ Delete temp entry
    await prisma.temp.delete({ where: { id: tempEntry.id } })

    // ✅ Calculate reminder time
    const now = new Date()
    const sessionStart = tempEntry.timeSlot.startTime
    const sessionDate = tempEntry.timeSlot.slotDate.date

    const timeDiff = sessionStart.getTime() - now.getTime()
    let reminderTriggerTime: Date

    if (timeDiff >= 24 * 60 * 60 * 1000) {
      reminderTriggerTime = new Date(sessionStart.getTime() - 24 * 60 * 60 * 1000)
    } else if (timeDiff > 15 * 60 * 1000) {
      reminderTriggerTime = new Date(now.getTime() + timeDiff / 2)
    } else {
      reminderTriggerTime = new Date(now.getTime() + 1 * 60 * 1000)
    }

    // ✅ Proper ISO format in IST
    const formattedTriggerTime = formatInTimeZone(
      reminderTriggerTime,
      "Asia/Kolkata",
      "yyyy-MM-dd'T'HH:mm:ssXXX"
    )

    // ✅ Send to n8n
    const amount = paymentEntity.amount / 100

    const sessionDateFormatted = formatInTimeZone(sessionDate, "Asia/Kolkata", "dd MMMM yyyy")
const sessionTimeFormatted = formatInTimeZone(sessionStart, "Asia/Kolkata", "hh:mm a")

   try {
  const n8nResponse = await fetch("http://129.154.255.167:5678/webhook/591268f2-ef5d-452a-816b-9f41fc616f04", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: tempEntry.fullName,
      email: tempEntry.email,
      phone: tempEntry.whatsapp,
      orderId,
      paymentId,
      amount,
      sessionDate: sessionDateFormatted,
      sessionStartTime: sessionTimeFormatted,
      reminderTriggerTime: formattedTriggerTime,
    }),
  })

  if (n8nResponse.ok) {
    await prisma.emailLog.create({
      data: {
        clientId: user.id,
        emailType: "CONFIRMATION",
        subject: "Your Nereus Testing Session is Confirmed",
        status: "SENT",
        sentVia: "EMAIL",
        sessionDate: sessionDate,
      },
    })
  } else {
    console.error("❌ n8n webhook failed with status:", n8nResponse.status)
  }
} catch (err) {
  console.error("❌ Error triggering n8n webhook:", err)
}


    return new NextResponse("✅ Booking created and automation triggered", { status: 200 })

  } catch (error) {
    console.error("❌ Webhook error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
