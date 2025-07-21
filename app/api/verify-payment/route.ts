import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// 1️⃣ Explicitly define expected structure
type BookingWithClientAndSlot = {
  invoiceNumber: number
  paymentId: string
  createdAt: Date
  client: {
    fullName: string
    email: string
  }
  timeSlot?: {
    slotDate?: {
      price?: number
    }
  }
}

export async function POST(req: NextRequest) {
  const { razorpay_payment_id } = await req.json()

  if (!razorpay_payment_id) {
    return NextResponse.json({ success: false, error: "Payment ID missing" }, { status: 400 })
  }

  try {
    const payment = await razorpay.payments.fetch(razorpay_payment_id)

    if (payment.status !== "captured") {
      return NextResponse.json({ success: false, message: "Payment not captured yet." }, { status: 400 })
    }

    // 2️⃣ Explicitly cast the result
    const booking = await prisma.booking.findFirst({
  where: { paymentId: razorpay_payment_id },
  select: {
    invoiceNumber: true,
    paymentId: true,
    createdAt: true,
    client: {
      select: {
        fullName: true,
        email: true,
      },
    },
    timeSlot: {
      select: {
        slotDate: {
          select: {
            price: true,
          },
        },
      },
    },
    promoUsage: {
      select: {
        promoCode: {
          select: {
            code: true,
            discountType: true,
            discountValue: true,
          },
        },
      },
    },
  },
}) as BookingWithClientAndSlot & {
  promoUsage: { promoCode: { code: string; discountType: string; discountValue: number } }[]
} | null;

    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found." }, { status: 409 })
    }

    let amount = booking.timeSlot?.slotDate?.price
    if (amount == null) {
      const config = await prisma.config.findFirst()
      if (!config?.price) {
        return NextResponse.json({ success: false, message: "Could not determine booking amount." }, { status: 500 })
      }
      amount = config.price
    }
const promo = booking.promoUsage[0]?.promoCode;

return NextResponse.json({
  success: true,
  invoiceNumber: `INV${booking.invoiceNumber.toString().padStart(4, "0")}`,
  paymentId: booking.paymentId,
  amount,
  date: booking.createdAt,
  fullName: booking.client.fullName,
  email: booking.client.email,
  promoCode: promo
    ? {
        code: promo.code,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
      }
    : null,
})
  } catch (err) {
    console.error("Payment verification failed:", err)
    return NextResponse.json({ success: false, message: "Failed to verify payment." }, { status: 500 })
  }
}
