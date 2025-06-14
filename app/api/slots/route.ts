// File: app/api/slots/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from "../../../lib/generated/prisma"


const prisma = new PrismaClient()

export async function GET() {
  try {
    const slots = await prisma.slot.findMany({
        where: {
    bookings: {
      none: {}, 
    },
  },
      select: {
        id: true,
        date: true,
        location: true,
        timeSlot: true,
      },
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(slots);
  } catch (error) {
    console.error('Error fetching slots:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
