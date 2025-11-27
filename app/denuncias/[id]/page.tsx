// app/denuncias/[id]/page.tsx
"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { mockComplaints } from "@/lib/complaints-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CasoDetallePage() {
  const params = useParams()
  const id = params?.id as string
  const complaint = mockComplaints.find((c) => c.id === id)

  if (!complaint) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Caso no encontrado</h2>
            <p className="text-secondary text-sm">
              El folio no existe en los datos disponibles.
            </p>
            <Link href="/denuncias">
              <Button className="mt-4">Volver a seguimiento</Button>
            </Link>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{complaint.title}</h1>
              <p className="text-secondary text-sm">
                Folio: <span className="font-semibold">{complaint.folio}</span>
              </p>
            </div>
            <Link href="/denuncias">
              <Button variant="outline">Volver</Button>
            </Link>
          </div>

          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Datos del caso</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-secondary">Tipo de caso</p>
                <p className="font-medium text-foreground">{complaint.caseType}</p>
              </div>
              <div>
                <p className="text-secondary">Ámbito</p>
                <p className="font-medium text-foreground">{complaint.scope}</p>
              </div>
              <div>
                <p className="text-secondary">Institución</p>
                <p className="font-medium text-foreground">{complaint.institution}</p>
              </div>
              <div>
                <p className="text-secondary">Ubicación</p>
                <p className="font-medium text-foreground">
                  {complaint.state}
                  {complaint.municipality ? `, ${complaint.municipality}` : ""}
                </p>
              </div>
              <div>
                <p className="text-secondary">Medio de captación</p>
                <p className="font-medium text-foreground">{complaint.channel}</p>
              </div>
              <div>
                <p className="text-secondary">Estatus actual</p>
                <p className="font-medium text-foreground">
                  {complaint.status.replace("-", " ")}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Línea de tiempo</h2>

            <div className="space-y-4">
              {complaint.timeline.map((t, i) => (
                <div key={i} className="border-l-2 border-primary pl-4">
                  <p className="text-xs text-secondary">
                    {new Date(t.date).toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {t.status.replace("-", " ")}
                  </p>
                  <p className="text-sm text-secondary">{t.note}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 mt-6 bg-muted/40">
            <p className="text-xs text-secondary">
              * Esta información es informativa y basada en datos abiertos o simulados.  
              Para detalles oficiales, consulta directamente el sistema donde registraste tu folio.
            </p>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
