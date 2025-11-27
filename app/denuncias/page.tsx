// app/denuncias/page.tsx
"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { mockComplaints, Complaint } from "@/lib/complaints-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SeguimientoFolioPage() {
  const [folio, setFolio] = useState("")
  const [origin, setOrigin] = useState<"SIDEC" | "PCDA-QR" | "MUNICIPAL" | "OTRO">("SIDEC")
  const [searched, setSearched] = useState(false)

  const foundCase: Complaint | undefined = useMemo(() => {
    if (!folio.trim()) return undefined
    const f = folio.trim().toUpperCase()
    return mockComplaints.find((c) => c.folio.toUpperCase() === f)
  }, [folio])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Rastrea tu Folio</h1>
          <p className="text-secondary text-lg mb-8">
            Consulta el estado de tu denuncia, queja o petición registrada en plataformas oficiales.
          </p>

          {/* Aviso legal */}
          <Card className="p-4 mb-6 bg-muted/40">
            <p className="text-sm text-secondary">
              Esta plataforma es informativa y utiliza datos abiertos o simulados. 
              No sustituye a las plataformas oficiales ni recibe denuncias directamente.
            </p>
          </Card>

          {/* Formulario de búsqueda */}
          <Card className="p-6 mb-8">
            <div className="grid gap-4">
              <label className="text-sm font-medium text-foreground">Origen del folio</label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value as any)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="SIDEC">SIDEC (Federal)</option>
                <option value="PCDA-QR">Denuncia Anticorrupción Q. Roo (Estatal)</option>
                <option value="MUNICIPAL">Portal Municipal</option>
                <option value="OTRO">Otro sistema</option>
              </select>

              <label className="text-sm font-medium text-foreground mt-2">Folio</label>
              <input
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
                placeholder="Ej: SIDEC-2025-001"
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              />

              <Button onClick={() => setSearched(true)} className="mt-2 w-fit">
                Buscar folio
              </Button>
            </div>
          </Card>

          {/* Resultado */}
          {searched && (
            <>
              {!foundCase ? (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">No encontramos tu folio</h3>
                  <p className="text-secondary text-sm">
                    Verifica que esté bien escrito o consulta directamente en la plataforma oficial donde lo registraste.
                  </p>
                </Card>
              ) : (
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{foundCase.title}</h2>
                      <p className="text-secondary text-sm mt-1">
                        Folio: <span className="font-semibold">{foundCase.folio}</span> · Origen: {origin}
                      </p>
                    </div>
                    <Link href={`/denuncias/${foundCase.id}`}>
                      <Button variant="outline">Ver detalle</Button>
                    </Link>
                  </div>

                  {/* Datos del caso */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-secondary">Tipo de caso</p>
                      <p className="font-medium text-foreground">{foundCase.caseType}</p>
                    </div>
                    <div>
                      <p className="text-secondary">Ámbito</p>
                      <p className="font-medium text-foreground">{foundCase.scope}</p>
                    </div>
                    <div>
                      <p className="text-secondary">Institución</p>
                      <p className="font-medium text-foreground">{foundCase.institution}</p>
                    </div>
                    <div>
                      <p className="text-secondary">Ubicación</p>
                      <p className="font-medium text-foreground">
                        {foundCase.state}
                        {foundCase.municipality ? `, ${foundCase.municipality}` : ""}
                      </p>
                    </div>
                  </div>

                  {/* Estatus */}
                  <div className="mt-6">
                    <p className="text-secondary text-sm mb-2">Estatus actual</p>
                    <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {foundCase.status.replace("-", " ")}
                    </div>
                  </div>

                  {/* Línea de tiempo corta */}
                  <div className="mt-6">
                    <p className="text-secondary text-sm mb-3">Historial reciente</p>
                    <div className="space-y-3">
                      {foundCase.timeline.slice(0, 3).map((t, i) => (
                        <div key={i} className="border-l-2 border-primary pl-3">
                          <p className="text-xs text-secondary">
                            {new Date(t.date).toLocaleString()}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {t.status.replace("-", " ")}
                          </p>
                          <p className="text-sm text-secondary">{t.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
