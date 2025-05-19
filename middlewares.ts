import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['en','fr']
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (LOCALES.some(l => pathname.startsWith(`/${l}/`))) return
  const url = req.nextUrl.clone()
  url.pathname = `/en${pathname}`
  return NextResponse.redirect(url)
}
export const config = { matcher: ['/((?!_next).*)'] }
