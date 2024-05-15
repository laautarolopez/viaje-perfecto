import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
const publicRoutes = ['/login', '/register']
 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)
  const isProtectedRoute = !isPublicRoute
 
  const user_id = cookies().get('user_id')?.value
 
  if (isProtectedRoute && !user_id) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  
  if (isPublicRoute && user_id) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}