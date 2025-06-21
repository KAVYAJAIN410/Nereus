import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import Razorpay from "razorpay";



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
    console.log("kabua ajajiaj")
  const { razorpay_payment_id } = await req.json();

  if (!razorpay_payment_id) {
    return NextResponse.json({ success: false, error: "Payment ID missing" }, { status: 400 });
  }

  try {
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== "captured") {
      return NextResponse.json({ success: false, message: "Payment not captured yet." }, { status: 400 });
    }

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
  },
});

    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found." }, { status: 409 });
    }
     const config = await prisma.config.findFirst()
    const amount = (config?.price ?? 100) * 100
    return NextResponse.json({
      success: true,
      invoiceNumber: `INV${booking.invoiceNumber.toString().padStart(4, "0")}`,
      paymentId: booking.paymentId,
      amount: amount,
      date: booking.createdAt,
    fullName: booking.client.fullName,
    email: booking.client.email
    });
  } catch (err) {
    console.error("Payment verification failed:", err);
    return NextResponse.json({ success: false, message: "Failed to verify payment." }, { status: 500 });
  }
}
