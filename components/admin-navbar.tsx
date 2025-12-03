"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminNavbar() {
  const router = useRouter();

  const handleGoHome = () => {
    // Solo navegar al inicio, NO tocar sesión
    router.push("/");
  };

  const handleLogout = () => {
    // 1) Limpiar localStorage (login tipo /login)
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("dfa_logged_in");
      window.localStorage.removeItem("dfa_user_email");
    }

    // 2) Limpiar cookies (signup tipo /signup)
    const expire = (name: string) => {
      document.cookie = `${name}=; path=/; max-age=0`;
    };

    expire("auth-token");
    expire("user-email");
    expire("user-name");
    expire("user-role");

    // 3) Mandar a la página principal
    router.push("/");
  };

  return (
    <header className="w-full border-b border-border bg-white">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo + nombre, igual que en el navbar principal */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo DATA FOR ALL"
            width={90}
            height={90}
            className="object-contain"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-primary">
              DATA FOR ALL — Panel
            </span>
            <span className="text-xs text-muted-foreground">
              Administrador de denuncias ciudadanas
            </span>
          </div>
        </Link>

        {/* Botones de la derecha */}
        <div className="flex items-center gap-2">
          {/* Volver al inicio SIN cerrar sesión */}
          <Button
            type="button"
            variant="outline"
            className="text-sm"
            onClick={handleGoHome}
          >
            Volver al inicio
          </Button>

          {/* Cerrar sesión: limpia todo y manda a / */}
          <Button
            type="button"
            variant="destructive"
            className="text-sm"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </div>
      </nav>
    </header>
  );
}
