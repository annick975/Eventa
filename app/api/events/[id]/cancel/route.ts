import { NextResponse } from 'next/server'
import { cancelBooking } from '@/lib/db'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body = await request.json()
  const updatedEvent = cancelBooking(id, body.name)

  if (updatedEvent) {
    return NextResponse.json(updatedEvent)
  } else {
    return NextResponse.json({ error: 'Booking not found or event not found' }, { status: 400 })
  }
}