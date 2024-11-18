"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "./icons"


// TODO: mobile sidebar

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex w-full">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          Indonesiaku
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/translate"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/translate")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Translator
        </Link>
        <Link
          href="/jono"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/jono")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Jono
        </Link>
        <Link
          href="/data"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/data")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Data
        </Link>
        <Link
          href="/posts"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/posts")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Posts
        </Link>
      </nav>
    </div>
  )
}