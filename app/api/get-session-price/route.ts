// app/api/get-session-price/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // adjust path as needed

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { timeSlotId } = body;

    if (!timeSlotId) {
      return NextResponse.json({ error: 'Missing timeSlotId' }, { status: 400 });
    }
    console.log(timeSlotId)

    const timeSlot = await prisma.timeSlot.findUnique({
      where: { id: timeSlotId },
      include: { slotDate: true },
    });

    if (!timeSlot) {
      return NextResponse.json({ error: 'Time slot not found' }, { status: 404 });
    }

    // Priority: TimeSlot.price > SlotDate.price > fallback (Config table)
    let price = timeSlot.price;

    if (price == null && timeSlot.slotDate?.price != null) {
      price = timeSlot.slotDate.price;
    }

    if (price == null) {
      const config = await prisma.config.findFirst();
      price = config?.price ?? 0;
    }

    return NextResponse.json({ price });
  } catch (error) {
    console.error('Error fetching session price:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
