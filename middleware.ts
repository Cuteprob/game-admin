import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// 需要保护的路由
const protectedPaths = [
  "/gamesBase",
  "/categories",
  "/projects",
  "/comments",
  "/api/gamesBase",
  "/api/categories",
  "/api/projects",
  "/api/admin",
]

// 使用固定的密钥（生产环境应该使用环境变量）
const JWT_SECRET = "VY+Qz3Qj5YFxT9Qq3Z8Ns4K2Jm6Rh8Pw7Dt5Xc9Gn1Bv4Lm2"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 检查是否是受保护的路由
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  )

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  const token = request.cookies.get("token")?.value

  if (!token) {
    console.log("No token found, redirecting to login")
    return redirectToLogin(request)
  }

  try {
    // 使用固定的密钥验证 token
    await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    )
    return NextResponse.next()
  } catch (error) {
    console.error("Token verification failed:", error)
    return redirectToLogin(request)
  }
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = "/login"
  url.search = `?from=${request.nextUrl.pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    /*
     * 匹配所有需要保护的路由:
     * - /gamesBase 相关路由
     * - /categories 相关路由
     * - /api 相关路由
     * - /comments 相关路由
     */
    "/gamesBase/:path*",
    "/categories/:path*",
    "/api/:path*",
    "/projects/:path*",
    "/comments/:path*",
  ],
} 