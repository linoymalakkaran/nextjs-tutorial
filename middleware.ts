import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function runs on EVERY request before it reaches the page
export function middleware(request: NextRequest) {
  // Log the request
  console.log('🔥 Middleware executed for:', request.nextUrl.pathname)

  // Create response
  const response = NextResponse.next()

  // Add custom header to prove middleware ran
  response.headers.set('x-middleware-executed', 'true')
  response.headers.set('x-pathname', request.nextUrl.pathname)

  // Example: Redirect based on condition
  // if (request.nextUrl.pathname === '/old-path') {
  //   return NextResponse.redirect(new URL('/new-path', request.url))
  // }

  // Example: Add authentication check
  // const token = request.cookies.get('auth-token')
  // if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  return response
}

// Configure which paths the middleware runs on
export const config = {
  // Match all paths except:
  // - API routes
  // - Static files (_next/static)
  // - Image optimization files (_next/image)
  // - favicon
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
