import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import { getEnvVariable } from "@/lib/env"
export const runtime = 'edge';

// 使用默认值
const ADMIN_USERNAME = getEnvVariable("ADMIN_USERNAME", "admin")
const ADMIN_PASSWORD = getEnvVariable("ADMIN_PASSWORD", "admin")
const JWT_SECRET = getEnvVariable("NEXTAUTH_SECRET", "your-nextauth-secret-key")

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // 验证用户名和密码
    if (
      username !== ADMIN_USERNAME ||
      password !== ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { error: "username or password is incorrect" },
        { status: 401 }
      )
    }

    // 创建 JWT token
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(JWT_SECRET))

    // 设置 cookie
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    )
  }
}