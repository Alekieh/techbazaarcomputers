import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, name, googleId } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Google account details incomplete" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Find existing user or register new Google user
    let user = await db.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      // Create new customer user with Google authentication
      const dummyPasswordHash = await bcrypt.hash(`GoogleAuth_${googleId || Date.now()}`, 10);
      user = await db.user.create({
        data: {
          name: name.trim(),
          email: cleanEmail,
          passwordHash: dummyPasswordHash,
          role: "CUSTOMER",
        },
      });
    }

    // Generate JWT token
    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

    response.cookies.set("tb_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google Auth error:", error);
    return NextResponse.json(
      { error: "Google authentication failed" },
      { status: 500 }
    );
  }
}
