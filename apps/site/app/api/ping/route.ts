import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  console.log("PING", new Date().toISOString());
  return NextResponse.json({ ok: true, t: Date.now() }, { status: 200 });
}
