"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    href: "/orientador",
    label: "¿Dónde Denuncio?",
  },
  {
    href: "/guia",
    label: "Guía",
  },
  {
    href: "/datos-abiertos",
    label: "Datos Abiertos",
  },
  {
    href: "/programas",
    label: "Programas sociales",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // NUEVO: estado para el menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detectar sesión (cookies + localStorage)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasLocal = window.localStorage.getItem("dfa_logged_in") === "1";

    const cookies = typeof document !== "undefined" ? document.cookie : "";
    const hasCookie = cookies.includes("auth-token=");

    setIsLoggedIn(hasLocal || hasCookie);
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("dfa_logged_in");
      window.localStorage.removeItem("dfa_user_email");
    }

    const expire = (name: string) => {
      document.cookie = `${name}=; path=/; max-age=0`;
    };

    expire("auth-token");
    expire("user-email");
    expire("user-name");
    expire("user-role");

    setIsLoggedIn(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="w-full bg-white border-b sticky top-0 z-40">
      {/* Barra principal */}
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={90}
            height={90}
            className="object-contain"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-xl font-extrabold tracking-tight text-primary">
              DATA FOR ALL
            </span>
            <span className="text-xs text-muted-foreground">
              Datos abiertos. Puertas abiertas.
            </span>
          </div>
        </Link>

        {/* Links del menú – SOLO DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-foreground hover:text-primary transition-colors",
                pathname === link.href && "text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Lado derecho – DESKTOP */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link
                href="/admin"
                className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
              >
                Ir al panel
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-full border border-red-500 text-red-600 text-sm font-semibold hover:bg-red-50 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
            >
              Inicio de sesión
            </Link>
          )}
        </div>

        {/* Lado derecho – MÓVIL: botón + hamburguesa */}
        <div className="flex md:hidden items-center gap-2">
          {isLoggedIn ? (
            <Link
              href="/admin"
              onClick={closeMenu}
              className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition"
            >
              Panel
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={closeMenu}
              className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition"
            >
              Inicio
            </Link>
          )}

          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-full p-2 border border-gray-200 text-foreground hover:bg-gray-50 focus:outline-none"
            aria-label="Abrir menú"
          >
            {isMenuOpen ? (
              // Icono X
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Icono ☰
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Menú desplegable – MÓVIL */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto flex flex-col gap-3 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "text-sm text-foreground hover:text-primary transition-colors",
                  pathname === link.href && "text-primary font-medium"
                )}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 px-4 py-2 rounded-full border border-red-500 text-red-600 text-sm font-semibold hover:bg-red-50 transition self-start"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
