"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getDenunciaById, programasSociales } from "@/lib/api-mock-data"

export default function DenunciaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const denuncia = getDenunciaById(Number.parseInt(id))

  if (!denuncia) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Denuncia no encontrada</h2>
            <p className="text-secondary mb-6">El folio {id} no existe en el sistema</p>
            <Button onClick={() => router.push("/explorador")}>Volver al explorador</Button>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  // Buscar programas relacionados con el área afectada
  const programasRelacionados = programasSociales
    .filter(
      (p) =>
        denuncia.clasificacion_falta?.area_proyecto_vinculado
          .toLowerCase()
          .includes(p.categoria_programa.toLowerCase()) ||
        p.categoria_programa
          .toLowerCase()
          .includes(denuncia.clasificacion_falta?.area_proyecto_vinculado.toLowerCase() || ""),
    )
    .slice(0, 2)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => router.push("/explorador")} className="mb-6">
          ← Volver al explorador
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Encabezado */}
          <Card className="p-6 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Folio {denuncia.folio_id}</h1>
                <p className="text-secondary">
                  Registrada el{" "}
                  {new Date(denuncia.fecha_emision).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Badge
                variant={denuncia.estado_denuncia === "Cerrada" ? "secondary" : "default"}
                className="text-sm px-3 py-1"
              >
                {denuncia.estado_denuncia}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {denuncia.clasificacion_falta && (
                <>
                  <Badge variant="outline">{denuncia.clasificacion_falta.tipo_falta}</Badge>
                  <Badge variant="outline">{denuncia.clasificacion_falta.area_proyecto_vinculado}</Badge>
                </>
              )}
              {denuncia.calidad_denunciante && (
                <Badge variant="outline">Denunciante: {denuncia.calidad_denunciante.calidad_denunciante}</Badge>
              )}
            </div>
          </Card>

          {/* Descripción */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">Descripción del caso</h2>
            <p className="text-foreground leading-relaxed">{denuncia.razon_justificacion}</p>
          </Card>

          {/* Servidor público implicado */}
          {denuncia.servidor_publico && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Servidor público implicado</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-secondary mb-1">Organismo/Alcaldía</p>
                  <p className="font-medium text-foreground">{denuncia.servidor_publico.organismo_alcaldia}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Cargo</p>
                  <p className="font-medium text-foreground">{denuncia.servidor_publico.cargo_grado_servidor}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Tipo de falta atribuida</p>
                  <p className="font-medium text-foreground">{denuncia.servidor_publico.tipo_de_falta}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Unidad investigadora</p>
                  <p className="font-medium text-foreground">{denuncia.servidor_publico.unidad_investigadora}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Proceso de investigación */}
          {denuncia.proceso_investigacion && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Proceso de investigación</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-secondary mb-1">Plazo legal</p>
                  <p className="font-medium text-foreground">
                    {denuncia.proceso_investigacion.plazos_legales_dias} días
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Medidas cautelares</p>
                  <p className="font-medium text-foreground">{denuncia.proceso_investigacion.medidas_cautelares}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Resolución y sanción */}
          {denuncia.resolucion_sancion && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Resolución y sanción</h2>

              {denuncia.resolucion_sancion.fecha_resolucion_final ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-secondary mb-1">Fecha de resolución</p>
                      <p className="font-medium text-foreground">
                        {new Date(denuncia.resolucion_sancion.fecha_resolucion_final).toLocaleDateString("es-MX")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary mb-1">Resultado del fallo</p>
                      <Badge variant="default" className="bg-success text-white">
                        {denuncia.resolucion_sancion.resultado_fallo}
                      </Badge>
                    </div>
                  </div>

                  {denuncia.resolucion_sancion.tipo_sancion_impuesta && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-secondary mb-1">Tipo de sanción</p>
                        <p className="font-medium text-foreground">
                          {denuncia.resolucion_sancion.tipo_sancion_impuesta}
                        </p>
                      </div>
                      {denuncia.resolucion_sancion.monto_suspension && (
                        <div>
                          <p className="text-sm text-secondary mb-1">
                            {denuncia.resolucion_sancion.tipo_sancion_impuesta === "Suspension"
                              ? "Días de suspensión"
                              : "Monto"}
                          </p>
                          <p className="font-medium text-foreground">
                            {denuncia.resolucion_sancion.monto_suspension}
                            {denuncia.resolucion_sancion.tipo_sancion_impuesta === "Suspension" ? " días" : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-secondary">
                  El caso aún no cuenta con resolución final. Sigue en proceso de investigación.
                </p>
              )}
            </Card>
          )}

          {/* Línea de tiempo */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Línea de tiempo</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-primary rounded-full -ml-[1.4rem]"></div>
                  <p className="text-xs text-secondary">
                    {new Date(denuncia.fecha_emision).toLocaleDateString("es-MX")}
                  </p>
                </div>
                <p className="font-medium text-foreground">Denuncia registrada</p>
                <p className="text-sm text-secondary mt-1">Caso recibido en el sistema</p>
              </div>

              {denuncia.proceso_investigacion && (
                <div className="border-l-2 border-primary pl-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 bg-primary rounded-full -ml-[1.4rem]"></div>
                    <p className="text-xs text-secondary">En proceso</p>
                  </div>
                  <p className="font-medium text-foreground">Investigación iniciada</p>
                  <p className="text-sm text-secondary mt-1">
                    Medidas cautelares: {denuncia.proceso_investigacion.medidas_cautelares}
                  </p>
                </div>
              )}

              {denuncia.resolucion_sancion?.fecha_resolucion_final && (
                <div className="border-l-2 border-success pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 bg-success rounded-full -ml-[1.4rem]"></div>
                    <p className="text-xs text-secondary">
                      {new Date(denuncia.resolucion_sancion.fecha_resolucion_final).toLocaleDateString("es-MX")}
                    </p>
                  </div>
                  <p className="font-medium text-foreground">Resolución emitida</p>
                  <p className="text-sm text-secondary mt-1">Fallo: {denuncia.resolucion_sancion.resultado_fallo}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Programas relacionados */}
          {programasRelacionados.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">Programas que podrían ayudarte</h2>
              <p className="text-secondary text-sm mb-4">Basado en el área relacionada con esta denuncia</p>

              <div className="space-y-3">
                {programasRelacionados.map((programa) => (
                  <Card key={programa.id} className="p-4 border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{programa.nombre_programa}</h3>
                        <p className="text-sm text-secondary mb-2">{programa.institucion_encargada}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {programa.tipo_apoyo}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {programa.costo_servicio}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href="/programas">Ver más</a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Button variant="link" asChild>
                  <a href="/programas">Ver todos los programas disponibles →</a>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
