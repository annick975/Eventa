import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  if (body.username === 'admin' && body.password === 'admin') {
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json({ success: false }, { status: 401 })
}