import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "../../../lib/generated/prisma"
import { getRedisClient } from "../../../lib/redis"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  console.log("Received Razorpay webhook")
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

    // ✅ Fetch tempEntry using tempId directly
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
      },
    })

    if (!tempEntry) {
      return new NextResponse("Temp data not found", { status: 404 })
    }

    // ✅ Find or create user
const existingUser = await prisma.client.findFirst({
  where: { email: tempEntry.email },
})

    const userCount = await prisma.client.count()
    const uniqueId = `NT-${(userCount + 1).toString().padStart(4, "0")}`

    const user = existingUser ?? await prisma.client.create({
      data: {
        fullName: tempEntry.fullName,
        age: tempEntry.age,
        gender: tempEntry.gender,
        email: tempEntry.email,
        whatsapp: tempEntry.whatsapp,
        medicalHistory: tempEntry.medicalHistory,
        whyMove: tempEntry.whyMove,
        fitnessGoal: tempEntry.fitnessGoal,
        uniqueId: uniqueId,
      },
    })

    // ✅ Update slot count
    await prisma.timeSlot.update({
      where: { id: tempEntry.timeSlotId },
      data: {
        count: {
          decrement: 1,
        },
      },
    })

    // ✅ Remove Redis lock
    const redisKey = `lock:slot:${tempEntry.timeSlotId}`
    await redis.decr(redisKey)

    // ✅ Create Booking
    await prisma.booking.create({
      data: {
        orderId: orderId,
        clientId: user.id,
        consentAgreement: tempEntry.consentAgreement,
        ageConfirmation: tempEntry.ageConfirmation,
        timeSlotId: tempEntry.timeSlotId,
        clientSessionNo: tempEntry.SessionNo,
        paymentStatus: "PAID",
        paymentId: paymentId,
      },
    })

    // ✅ Delete temp entry
    await prisma.temp.delete({
      where: { id: tempEntry.id },
    })

    // ✅ Trigger automation via n8n
    const amount = paymentEntity.amount / 100

    await fetch("http://129.154.255.167:5678/webhook/591268f2-ef5d-452a-816b-9f41fc616f04", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: tempEntry.fullName,
        email: tempEntry.email,
        phone: tempEntry.whatsapp,
        sessionTime: new Date().toISOString(), // Optional: replace with real timeSlot info
        orderId: orderId,
        paymentId: paymentId,
        amount: amount,
      }),
    }).catch(err => {
      console.error("n8n webhook failed:", err)
    })

    return new NextResponse("Booking created and automation triggered", { status: 200 })

  } catch (error) {
    console.error("Webhook error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
