import { NextResponse } from 'next/server'
import { bookEvent } from '@/lib/db'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body = await request.json()

  // Ensure the function is awaited, assuming it’s async
  const updatedEvent = await bookEvent(id, body)

  if (updatedEvent) {
    return NextResponse.json(updatedEvent)
  } else {
    return NextResponse.json({ error: 'No available seats or event not found' }, { status: 400 })
  }
}
