"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminNavbar() {
  const router = useRouter();

  const handleGoHome = () => {
    // ⬅️ Solo navegar al inicio, NO tocar sesión
    router.push("/");
  };

  const handleLogout = () => {
    // 🧹 1) Limpiar localStorage (login tipo /login)
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("dfa_logged_in");
      window.localStorage.removeItem("dfa_user_email");
    }

    // 🧹 2) Limpiar cookies (signup tipo /crear-cuenta)
    const expire = (name: string) => {
      document.cookie = `${name}=; path=/; max-age=0`;
    };

    expire("auth-token");
    expire("user-email");
    expire("user-name");
    expire("user-role");

    // 🚪 3) Mandar a la página principal
    router.push("/");
  };

  return (
    <header className="w-full border-b border-border bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Marca / enlace al inicio */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-extrabold tracking-tight text-primary">
            DATA FOR ALL — Panel
          </span>
          <span className="text-xs text-muted-foreground">
            Administrador de denuncias ciudadanas
          </span>
        </Link>

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
      </div>
    </header>
  );
}
