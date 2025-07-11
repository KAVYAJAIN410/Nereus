import { NextRequest, NextResponse } from 'next/server'
import { prisma} from "../../../lib/prisma"
import { getRedisClient } from '../../../lib/redis'
import { nanoid } from 'nanoid'
enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}



interface FormData {
  fullName: string
  age: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  email: string
  whatsapp: string
  medicalHistory?: string
  whyMove: string
  userSessionNo: number
  fitnessGoal: string
  consentAgreement: boolean
  ageConfirmation: boolean
  timeSlotId: string
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const redis = await getRedisClient()
    const data: FormData = await req.json()

    const {
      fullName,
      age,
      gender,
      email,
      whatsapp,
      medicalHistory,
      whyMove,
      fitnessGoal,
      consentAgreement,
      ageConfirmation,
      userSessionNo,
      timeSlotId,
    } = data

    // ✅ Server-side Validation
    const errors: Record<string, string> = {}

    const parsedAge = parseInt(age, 10)
    if (!fullName?.trim()) errors.fullName = "Full name is required"
    if (!age || isNaN(parsedAge) || parsedAge < 18) errors.age = "Age must be 18 or older"
    if (!userSessionNo || userSessionNo < 1) errors.userSessionNo = "Session number must be 1 or more"
    if (!['MALE', 'FEMALE', 'OTHER'].includes(gender?.toUpperCase())) errors.gender = "Invalid gender value"
    if (!whatsapp || !/^\d{10}$/.test(whatsapp)) errors.whatsapp = "WhatsApp number must be exactly 10 digits"
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email address"
    if (!whyMove?.trim()) errors.whyMove = "Why you move is required"
    if (!fitnessGoal?.trim()) errors.fitnessGoal = "Fitness goal is required"
    if (!consentAgreement) errors.consentAgreement = "Consent agreement is required"
    if (!ageConfirmation) errors.ageConfirmation = "Age confirmation is required"
    if (!timeSlotId) errors.timeSlotId = "Time slot ID is required"

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 })
    }

    // 1. Check slot availability (from DB)
const slot = await prisma.timeSlot.findUnique({
  where: { id: timeSlotId },
  select: {
    id: true,
    price: true,
    slotDate: true, // keep it if you're using `slotDate.date` somewhere
    count:true
  },
})

if(!slot){
  return NextResponse.json(
    { error: "Slot not found" },
    { status: 400 }
  )
}

const SLOT_MAX_COUNT = slot.count

const redisKey = `lock:slot:${timeSlotId}`
const locked = await redis.incr(redisKey)

if (locked > SLOT_MAX_COUNT) {
  await redis.decr(redisKey)
  return NextResponse.json(
    { error: "Slot temporarily full. Please try another one." },
    { status: 400 }
  )
}

await redis.expire(redisKey, 720) // expire lock after 5 mins

// 2. Save user data temporarily

console.log(email)
const tempEntry = await prisma.temp.create({
  data: {
    fullName,
    age: parsedAge,
    gender: gender.toUpperCase() as Gender,
    email,
    whatsapp,
    medicalHistory,
    whyMove,
    fitnessGoal,
    consentAgreement,
    ageConfirmation,
    SessionNo: userSessionNo,
    paymentStatus: 'PENDING',
    timeSlotId,
  },
})

// 3. Create Razorpay order
const auth = Buffer.from(
  `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
).toString('base64')


  const timeSlot = await prisma.timeSlot.findUnique({
  where: { id: timeSlotId },
  include: { slotDate: true },
})

let price = timeSlot?.price

if (price == null) {
  const config = await prisma.config.findFirst()
  if (!config || config.price == null) {
    return NextResponse.json({ error: "Unable to determine price for booking" }, { status: 500 })
  }
  price = config.price
}

const amount = price * 100 // Razorpay requires amount in paise




const orderResponse = await fetch('https://api.razorpay.com/v1/orders', {
  method: 'POST',
  headers: {
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount,
    currency: 'INR',
    receipt: `rcpt_${nanoid(6)}`,
    notes: {
      tempId: tempEntry.id,
    },
  }),
})

if (!orderResponse.ok) {
  const errorText = await orderResponse.text()
  console.error('Razorpay order creation failed:', errorText)

  // Rollback: delete temp entry + Redis lock
  await prisma.temp.delete({ where: { id: tempEntry.id } })
  await redis.decr(redisKey)

  return new NextResponse('Failed to create Razorpay order', { status: 500 })
}


const order = await orderResponse.json()

// 4. NOW: Lock slot in Redis (AFTER successful order)


// 5. Send back order
return NextResponse.json({ order })

  } catch (error) {
  console.error('Unexpected error:', error)

  // Optional: Extract timeSlotId if available from body
  try {
    const body = await req.json()
    const redis = await getRedisClient()
    const redisKey = `lock:slot:${body?.timeSlotId}`
    await redis.decr(redisKey)
  } catch (innerErr) {
    console.error('Failed to release Redis lock during error handling:', innerErr)
  }

  return new NextResponse('Internal Server Error', { status: 500 })
}
}

