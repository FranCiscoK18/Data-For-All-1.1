"use client"

import { useState } from "react"
import AdminNavbar from "@/components/admin-navbar"
import AdminSidebar from "@/components/admin-sidebar"
import Petitions from "@/components/admin/petitions"
import Metrics from "@/components/admin/metrics"
import { mockComplaints } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [complaints, setComplaints] = useState(mockComplaints)
  const [selectedComplaint, setSelectedComplaint] = useState<(typeof mockComplaints)[0] | null>(null)

  const updateComplaintStatus = (id: number, newStatus: string) => {
    setComplaints(
      complaints.map((c) =>
        c.id === id ? { ...c, status: newStatus, lastUpdate: new Date().toISOString().split("T")[0] } : c,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-8">
          {activeSection === "dashboard" && (
            <div>
              <h1 className="text-3xl font-bold mb-8 text-foreground">Panel de Control Administrativo</h1>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Casos", value: complaints.length, icon: "📋" },
                  {
                    label: "En Análisis",
                    value: complaints.filter((c) => c.status === "En análisis").length,
                    icon: "⏳",
                  },
                  { label: "Resueltas", value: complaints.filter((c) => c.status === "Resuelta").length, icon: "✅" },
                  {
                    label: "Canalizadas",
                    value: complaints.filter((c) => c.status === "Canalizada").length,
                    icon: "➡️",
                  },
                ].map((stat, i) => (
                  <Card key={i} className="p-4">
                    <p className="text-2xl mb-2">{stat.icon}</p>
                    <p className="text-secondary text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Cases */}
                <div className="lg:col-span-2">
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Casos Recientes (Demo)</h2>
                    <div className="space-y-3">
                      {complaints.slice(0, 3).map((complaint) => (
                        <div key={complaint.id} className="border border-border rounded p-4 hover:bg-light transition">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-foreground">{complaint.folio}</p>
                              <p className="text-sm text-secondary">
                                {complaint.type === "corrupción"
                                  ? "Corrupción"
                                  : complaint.type === "mal_servicio"
                                    ? "Mal servicio"
                                    : "Información"}
                              </p>
                            </div>
                            <span className="px-3 py-1 rounded text-sm font-medium bg-blue-100 text-primary">
                              {complaint.status}
                            </span>
                          </div>
                          <p className="text-sm text-secondary mb-3">{complaint.institution}</p>
                          <button
                            onClick={() => setSelectedComplaint(complaint)}
                            className="text-sm text-primary hover:underline"
                          >
                            Ver detalles →
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Quick Actions / Complaint Details */}
                <div>
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">
                      {selectedComplaint ? "Detalles del Caso" : "Acciones Rápidas"}
                    </h2>
                    {selectedComplaint ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-secondary">FOLIO</p>
                          <p className="font-semibold text-foreground">{selectedComplaint.folio}</p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary">ESTADO ACTUAL</p>
                          <p className="font-semibold text-foreground mb-2">{selectedComplaint.status}</p>
                          <div className="space-y-2">
                            {["En análisis", "Canalizada", "Resuelta"].map((status) => (
                              <Button
                                key={status}
                                onClick={() => {
                                  updateComplaintStatus(selectedComplaint.id, status)
                                  setSelectedComplaint({ ...selectedComplaint, status })
                                }}
                                variant={selectedComplaint.status === status ? "default" : "outline"}
                                className="w-full text-sm"
                              >
                                {status}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <Button onClick={() => setSelectedComplaint(null)} variant="outline" className="w-full">
                          Cerrar
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button className="w-full bg-primary hover:bg-primary-dark">📊 Generar Reporte</Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          📤 Exportar Datos
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          ⚙️ Configuración
                        </Button>
                        <div className="pt-4 border-t border-border">
                          <p className="text-xs text-secondary mb-2">Esto es un DEMO</p>
                          <p className="text-xs text-secondary">
                            Puedes cambiar estados de los casos para probar el sistema
                          </p>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            </div>
          )}
          {activeSection === "petitions" && <Petitions />}
          {activeSection === "metrics" && <Metrics />}
        </main>
      </div>
    </div>
  )
}
