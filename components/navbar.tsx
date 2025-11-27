"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("auth-token="))
    const userNameCookie = document.cookie.split("; ").find((row) => row.startsWith("user-name="))

    if (token) {
      setIsAuthenticated(true)
      if (userNameCookie) {
        setUserName(decodeURIComponent(userNameCookie.split("=")[1]))
      }
    }
  }, [pathname])

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; max-age=0"
    document.cookie = "user-email=; path=/; max-age=0"
    document.cookie = "user-name=; path=/; max-age=0"
    document.cookie = "user-role=; path=/; max-age=0"
    setIsAuthenticated(false)
    setUserName("")
    setShowMenu(false)
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-100 bg-white shadow">
      <div className="container mx-auto px-5 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">DATA FOR ALL</h1>
            <p className="text-xs text-secondary">Datos abiertos. Puertas abiertas.</p>
          </Link>
          <div className="flex gap-6 items-center text-sm">
            {!isAuthenticated ? (
              <>
                <Link href="/orientador" className="nav-link">
                  ¿Dónde Denuncio?
                </Link>
                <button onClick={() => handleScroll("tracking")} className="nav-link">
                  Rastrear
                </button>
                <Link href="/guia" className="nav-link">
                  Guía
                </Link>
                <Link href="/datos-abiertos" className="nav-link">
                  Datos Abiertos
                </Link>
                <Link
                  href="/login"
                  className="text-primary border-2 border-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/admin"
                  className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
                >
                  Admin
                </Link>
              </>
            ) : (
              <>
                <Link href="/orientador" className="nav-link">
                  ¿Dónde Denuncio?
                </Link>
                <Link href="/denuncias" className="nav-link">
                  Mis Denuncias
                </Link>
                <Link href="/datos-abiertos" className="nav-link">
                  Datos
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition"
                  >
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{userName}</span>
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-border overflow-hidden min-w-48">
                      <Link href="/denuncias" className="block px-4 py-2 hover:bg-light transition text-sm">
                        Mis Denuncias
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-light transition text-sm text-danger font-medium"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
