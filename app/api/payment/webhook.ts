// File: app/api/payment/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "../../../lib/generated/prisma"

const prisma = new PrismaClient()
import crypto from 'crypto';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET!;
    const rawBody = await req.text(); // Required for signature verification
    const signature = req.headers.get('x-razorpay-signature') || '';

    // Verify Razorpay Signature
    const expectedSignature = crypto
      .createHmac('sha256', razorpaySecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error('Invalid Razorpay signature');
      return new NextResponse('Invalid signature', { status: 400 });
    }

    const webhookData = JSON.parse(rawBody);

    // Only handle successful payments
    if (
      webhookData.event === 'payment.captured' ||
      webhookData.event === 'payment.failed'
    ) {
      const paymentId = webhookData.payload.payment.entity.id;
      const status = webhookData.event === 'payment.captured' ? 'PAID' : 'FAILED';

      const orderId = webhookData.payload.payment.entity.order_id;

      // Find the corresponding user by Razorpay order ID (using created receipt ID)
      const order = await prisma.user.findFirst({
        where: {
          paymentStatus: 'PENDING',
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!order) {
        console.error('No pending order found');
        return new NextResponse('Order not found', { status: 404 });
      }

      // Update user with payment status
      await prisma.user.update({
        where: { id: order.id },
        data: {
          paymentId,
          paymentStatus: status,
          invoiceNumber: `INV-${paymentId.slice(-6)}`, // Just an example
        },
      });

      // Optional: trigger email/WhatsApp via Zapier here

      return new NextResponse('Webhook processed successfully', { status: 200 });
    }

    return new NextResponse('Event ignored', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
