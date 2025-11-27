"use client"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Nuestros Módulos</h2>
          <p className="text-secondary text-center mb-12">Conoce todas las herramientas disponibles</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Orientador */}
            <Card className="p-6 hover:shadow-lg transition border-2 border-border">
              <div className="text-4xl mb-4">🧭</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">¿Dónde Denuncio?</h3>
              <p className="text-secondary mb-4 text-sm">
                Descubre la plataforma correcta según tu tipo de caso y nivel de gobierno
              </p>
              <Link href="/orientador">
                <Button className="w-full bg-primary hover:bg-primary-dark">Acceder</Button>
              </Link>
            </Card>

            {/* Explorador de denuncias */}
            <Card className="p-6 hover:shadow-lg transition border-2 border-border">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Explorador de Denuncias</h3>
              <p className="text-secondary mb-4 text-sm">Consulta y filtra todas las denuncias con datos abiertos</p>
              <Link href="/explorador">
                <Button className="w-full bg-primary hover:bg-primary-dark">Explorar</Button>
              </Link>
            </Card>

            {/* Rastreo */}
            <Card className="p-6 hover:shadow-lg transition border-2 border-border">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Rastrear Folio</h3>
              <p className="text-secondary mb-4 text-sm">
                Sigue el estado de tu denuncia, queja o petición en tiempo real
              </p>
              <Link href="/denuncias">
                <Button variant="outline" className="w-full bg-transparent">
                  Rastrear Ahora
                </Button>
              </Link>
            </Card>

            {/* Programas sociales */}
            <Card className="p-6 hover:shadow-lg transition border-2 border-border">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Programas y Servicios</h3>
              <p className="text-secondary mb-4 text-sm">Conoce los apoyos y servicios públicos disponibles</p>
              <Link href="/programas">
                <Button variant="outline" className="w-full bg-transparent">
                  Ver programas
                </Button>
              </Link>
            </Card>

            {/* Datos abiertos */}
            <Card className="p-6 hover:shadow-lg transition border-2 border-border">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Datos Abiertos</h3>
              <p className="text-secondary mb-4 text-sm">
                Explora estadísticas públicas y métricas de rendición de cuentas
              </p>
              <Link href="/datos-abiertos">
                <Button variant="outline" className="w-full bg-transparent">
                  Ver estadísticas
                </Button>
              </Link>
            </Card>

            {/* Guía */}
            <Card className="p-6 hover:shadow-lg transition border-2 border-border">
              <div className="text-4xl mb-4">📘</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Guía Paso a Paso</h3>
              <p className="text-secondary mb-4 text-sm">
                Entiende qué es una denuncia, quéja o petición y cómo funciona el proceso
              </p>
              <Link href="/guia">
                <Button variant="outline" className="w-full bg-transparent">
                  Abrir guía
                </Button>
              </Link>
            </Card>

            {/* Admin demo */}
            <Card className="p-6 hover:shadow-lg transition border-2 border-border">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Dashboard Demo</h3>
              <p className="text-secondary mb-4 text-sm">Vista simulada para servidores públicos (solo prototipo)</p>
              <Link href="/admin">
                <Button variant="outline" className="w-full bg-transparent">
                  Entrar
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
