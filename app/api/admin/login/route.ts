import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body
  
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error('Admin credentials not set in environment variables')
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 })
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ message: 'Login successful' })
    response.cookies.set('adminLoggedIn', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    })
    return response
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }
}