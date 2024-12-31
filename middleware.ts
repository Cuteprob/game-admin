import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"
import { getEnvVariable } from "./lib/env"


const JWT_SECRET = getEnvVariable("NEXTAUTH_SECRET")

// 需要保护的路由
const protectedPaths = [
  "/gamesBase",
  "/categories",
  "/projects",
  "/api/gamesBase",
  "/api/categories",
  "/api/projects",
]

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
    return redirectToLogin(request)
  }

  try {
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
     */
    "/gamesBase/:path*",
    "/categories/:path*",
    "/api/:path*",
    "/projects/:path*",
  ],
} 