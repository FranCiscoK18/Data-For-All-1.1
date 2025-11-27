"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getDenunciasCompletas, getEstadisticas } from "@/lib/api-mock-data"

export default function ExploradorPage() {
  const denuncias = getDenunciasCompletas()
  const estadisticas = getEstadisticas()

  const [filtroOrganismo, setFiltroOrganismo] = useState<string>("Todos")
  const [filtroTipoFalta, setFiltroTipoFalta] = useState<string>("Todos")
  const [filtroEstado, setFiltroEstado] = useState<string>("Todos")
  const [filtroCalidad, setFiltroCalidad] = useState<string>("Todos")

  // Extraer opciones únicas para filtros
  const organismos = ["Todos", ...new Set(denuncias.map((d) => d.servidor_publico?.organismo_alcaldia).filter(Boolean))]
  const tiposFalta = ["Todos", ...new Set(denuncias.map((d) => d.clasificacion_falta?.tipo_falta).filter(Boolean))]
  const estados = ["Todos", "En curso", "Cerrada", "En revision"]
  const calidades = [
    "Todos",
    ...new Set(denuncias.map((d) => d.calidad_denunciante?.calidad_denunciante).filter(Boolean)),
  ]

  // Aplicar filtros
  const denunciasFiltradas = useMemo(() => {
    return denuncias.filter((d) => {
      if (filtroOrganismo !== "Todos" && d.servidor_publico?.organismo_alcaldia !== filtroOrganismo) return false
      if (filtroTipoFalta !== "Todos" && d.clasificacion_falta?.tipo_falta !== filtroTipoFalta) return false
      if (filtroEstado !== "Todos" && d.estado_denuncia !== filtroEstado) return false
      if (filtroCalidad !== "Todos" && d.calidad_denunciante?.calidad_denunciante !== filtroCalidad) return false
      return true
    })
  }, [denuncias, filtroOrganismo, filtroTipoFalta, filtroEstado, filtroCalidad])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Explorador de Denuncias</h1>
        <p className="text-secondary text-lg mb-8">Consulta y filtra las denuncias registradas con datos abiertos</p>

        {/* Dashboard de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="text-2xl font-bold text-foreground mb-1">{estadisticas.total}</div>
            <div className="text-sm text-secondary">Total de denuncias</div>
          </Card>

          <Card className="p-6">
            <div className="text-2xl font-bold text-primary mb-1">{estadisticas.enCurso}</div>
            <div className="text-sm text-secondary">En curso</div>
          </Card>

          <Card className="p-6">
            <div className="text-2xl font-bold text-success mb-1">{estadisticas.cerradas}</div>
            <div className="text-sm text-secondary">Cerradas</div>
          </Card>

          <Card className="p-6">
            <div className="text-2xl font-bold text-warning mb-1">{estadisticas.porcentajeFundadas}%</div>
            <div className="text-sm text-secondary">Fundadas (de cerradas)</div>
          </Card>
        </div>

        {/* Filtros y tabla */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar de filtros */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-4">
              <h3 className="font-semibold text-foreground mb-4">Filtros</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Organismo/Alcaldía</label>
                  <select
                    value={filtroOrganismo}
                    onChange={(e) => setFiltroOrganismo(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
                  >
                    {organismos.map((org) => (
                      <option key={org} value={org}>
                        {org}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Tipo de falta</label>
                  <select
                    value={filtroTipoFalta}
                    onChange={(e) => setFiltroTipoFalta(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
                  >
                    {tiposFalta.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Estado</label>
                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
                  >
                    {estados.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Denunciante</label>
                  <select
                    value={filtroCalidad}
                    onChange={(e) => setFiltroCalidad(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
                  >
                    {calidades.map((calidad) => (
                      <option key={calidad} value={calidad}>
                        {calidad}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setFiltroOrganismo("Todos")
                    setFiltroTipoFalta("Todos")
                    setFiltroEstado("Todos")
                    setFiltroCalidad("Todos")
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            </Card>
          </div>

          {/* Tabla de denuncias */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Resultados ({denunciasFiltradas.length})</h3>
              </div>

              <div className="space-y-4">
                {denunciasFiltradas.map((denuncia) => (
                  <Card key={denuncia.folio_id} className="p-4 hover:shadow-md transition border">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-foreground">Folio {denuncia.folio_id}</span>
                          <Badge variant={denuncia.estado_denuncia === "Cerrada" ? "secondary" : "default"}>
                            {denuncia.estado_denuncia}
                          </Badge>
                        </div>

                        <p className="text-sm text-secondary mb-3 line-clamp-2">{denuncia.razon_justificacion}</p>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                          <div>
                            <span className="text-secondary">Organismo:</span>
                            <p className="font-medium text-foreground">
                              {denuncia.servidor_publico?.organismo_alcaldia || "N/A"}
                            </p>
                          </div>
                          <div>
                            <span className="text-secondary">Tipo de falta:</span>
                            <p className="font-medium text-foreground">
                              {denuncia.clasificacion_falta?.tipo_falta || "N/A"}
                            </p>
                          </div>
                          <div>
                            <span className="text-secondary">Cargo:</span>
                            <p className="font-medium text-foreground">
                              {denuncia.servidor_publico?.cargo_grado_servidor || "N/A"}
                            </p>
                          </div>
                          <div>
                            <span className="text-secondary">Denunciante:</span>
                            <p className="font-medium text-foreground">
                              {denuncia.calidad_denunciante?.calidad_denunciante || "N/A"}
                            </p>
                          </div>
                        </div>

                        {denuncia.resolucion_sancion?.resultado_fallo && (
                          <div className="mt-3">
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              Fallo: {denuncia.resolucion_sancion.resultado_fallo}
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-secondary text-right">
                          {new Date(denuncia.fecha_emision).toLocaleDateString("es-MX")}
                        </div>
                        <Link href={`/denuncia/${denuncia.folio_id}`}>
                          <Button size="sm" variant="outline">
                            Ver detalle
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}

                {denunciasFiltradas.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-secondary">No se encontraron denuncias con los filtros aplicados</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
