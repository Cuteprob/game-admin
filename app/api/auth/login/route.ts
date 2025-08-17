import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { SignJWT } from "jose"

export const runtime = 'edge'

// 使用固定的密钥（生产环境应该使用环境变量）
const JWT_SECRET = "VY+Qz3Qj5YFxT9Qq3Z8Ns4K2Jm6Rh8Pw7Dt5Xc9Gn1Bv4Lm2"
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    console.log("Login attempt:", { username })

    // 验证用户名和密码
    if (
      username !== ADMIN_USERNAME ||
      password !== ADMIN_PASSWORD
    ) {
      console.log("Invalid credentials")
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      )
    }

    // 创建 JWT token
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(JWT_SECRET))

    console.log("Token created successfully")

    // 设置 cookie
    const cookieStore = cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/"
    })

    console.log("Cookie set successfully")
    return NextResponse.json({ 
      success: true,
      message: "Login successful"
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    )
  }
}