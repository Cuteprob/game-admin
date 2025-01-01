"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      console.log("response.ok", response.ok)
      if (response.ok) {
        console.log("data", data)
        toast.success("Login success")
        
        // 获取重定向 URL，移除 from= 前缀
        const from = searchParams.get('from')?.replace(/^\/+/, '') || 'gamesBase'
        const baseUrl = window.location.origin
        const redirectUrl = `${baseUrl}/${from}`
        
        console.log("重定向到:", redirectUrl)
        
        // 直接设置 location.replace 进行跳转
        window.location.replace(redirectUrl)
      } else {
        toast.error(data.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">
            Please Input the login information
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  )
}