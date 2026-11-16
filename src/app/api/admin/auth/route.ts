import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.ADMIN_PASSWORD || "ryuzv2026";

    if (password === correctPassword) {
      return NextResponse.json({ success: true, message: "Authorized" });
    } else {
      return NextResponse.json({ success: false, error: "Password salah!" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

