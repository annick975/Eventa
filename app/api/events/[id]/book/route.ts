import { NextResponse } from 'next/server'
import { bookEvent } from '@/lib/db'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body = await request.json()
  
  // Pass both the id and the booking details to bookEvent
  const updatedEvent = bookEvent(id, {
    name: body.name,
    location: body.location
  })

  if (updatedEvent) {
    return NextResponse.json(updatedEvent)
  } else {
    return NextResponse.json(
      { error: 'No available seats or event not found' },
      { status: 400 }
    )
  }
}