// app/api/promocodes/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path

export async function GET() {
  const today = new Date();
  const promoCodes = await prisma.promoCode.findMany({
    where: {
      isActive: true,
      OR: [
        { expiryDate: null },
        { expiryDate: { gt: today } }
      ],
    },
    select: {
      id: true,
      code: true,
      discountType: true,
      discountValue: true,
    },
  });

  return NextResponse.json(promoCodes);
}
