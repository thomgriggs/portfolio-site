import { NextResponse } from "next/server";
export const revalidate = 60;
export async function GET() { return NextResponse.json({ ok: true }, { status: 200 }); }
