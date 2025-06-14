// File: app/api/form/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient,Gender } from "../../../lib/generated/prisma"



const Prisma = new PrismaClient()

import Razorpay from 'razorpay'
import { nanoid } from 'nanoid'

interface FormData {
  fullName: string
  age: number
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  email: string
  whatsapp: string
  medicalHistory?: string
  whyMove: string
  fitnessGoal: string
  consentAgreement: boolean
  ageConfirmation: boolean
  slotId: string
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// 1. Save Partial Form Data & Create Razorpay Order
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data: FormData = await req.json()

    const {
      fullName, age, gender, email, whatsapp,
      medicalHistory, whyMove, fitnessGoal,
      consentAgreement, ageConfirmation, slotId,
    } = data

    

    // Save temporary user data with payment pending
    const user = await Prisma.user.create({
      data: {
        fullName,
        age: parseInt(String(age), 10),
      gender: gender.toUpperCase() as Gender,
        email,
        whatsapp,
        medicalHistory,
        whyMove,
        fitnessGoal,
        consentAgreement,
        ageConfirmation,
        paymentStatus: 'PENDING',
        slotId,
      },
    })

    // Get price from Config table
    const config = await Prisma.config.findFirst()
    const amount = config?.price ?? 100 // fallback to 0 if not set

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount, // amount in paise
      currency: 'INR',
      receipt: `rcpt_${nanoid(6)}`,
    })

    return NextResponse.json({ userId: user.id, order })
  } catch (error) {
    console.error('Error creating form entry:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
