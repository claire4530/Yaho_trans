// app/official_web/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.redirect('https://www.zcstcl.com', 301)
}
