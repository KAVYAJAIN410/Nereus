import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  try {
    const results = await prisma.$queryRaw<any[]>`
      SELECT 
        sd.id AS "slotDateId",
        sd.date AS "slotDateDate",
        sd.price AS "slotDatePrice",      
        l.name AS "locationName",
        l.address AS "locationAddress",
        l.link AS "locationLink",
        ts.id AS "timeSlotId",
        ts."startTime" AS "startTime",
        ts."endTime" AS "endTime",
        ts.count AS "count"
      FROM "SlotDate" sd
      JOIN "Location" l ON sd."locationId" = l.id
      JOIN "TimeSlot" ts ON ts."slotDateId" = sd.id
      WHERE ts.count > 0
        AND ts."startTime" > NOW()
      ORDER BY sd.date ASC, ts."startTime" ASC;
    `

    // Group by slotDate
    const grouped: Record<string, any> = {}

    for (const row of results) {
      const key = `${row.slotDateId}`
      if (!grouped[key]) {
        grouped[key] = {
          date: row.slotDateDate,
          price: row.slotDatePrice,
          location: {
            name: row.locationName,
            address: row.locationAddress,
            link: row.locationLink,
          },
          timeSlots: [],
        }
      }
      grouped[key].timeSlots.push({
        id: row.timeSlotId,
        startTime: row.startTime,
        endTime: row.endTime,
      })
    }

    const formatted = Object.values(grouped)

    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Error fetching slots:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
