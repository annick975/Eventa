import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('adminLoggedIn')?.value === 'true'
  
  // Allow access to login page
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Protect other admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}