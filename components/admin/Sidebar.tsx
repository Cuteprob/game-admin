"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { HomeIcon, FolderIcon, GamepadIcon, ListIcon } from "lucide-react"

const mainNav = [
  {
    title: "Dashboard",
    href: "/",
    icon: HomeIcon
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderIcon
  },
  {
    title: "GamesBase",
    href: "/gamesBase",
    icon: GamepadIcon
  },
  {
    title: "Categories",
    href: "/categories",
    icon: ListIcon
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold">
            Game Admin
          </h2>
          <nav className="space-y-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-muted"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}