"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { publicData } from "@/lib/data"
import { Card } from "@/components/ui/card"

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

export default function DatosAbiertosPage() {
  // Helper function to create simple bar chart
  const renderBarChart = (data: Record<string, number>, maxValue: number) => {
    return (
      <div className="space-y-3">
        {Object.entries(data).map(([name, value], index) => (
          <div key={name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-secondary">{name}</span>
              <span className="font-bold text-primary">{value}</span>
            </div>
            <div className="w-full bg-light rounded h-2">
              <div
                className="bg-primary rounded h-2 transition-all"
                style={{ width: `${(value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Helper function to create pie chart representation
  const renderPieChart = (data: Record<string, number>) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0)
    let currentRotation = 0
    const segments = Object.entries(data).map(([name, value], index) => {
      const percentage = (value / total) * 100
      const startRotation = currentRotation
      const endRotation = currentRotation + percentage
      currentRotation = endRotation
      return { name, value, percentage, startRotation, endRotation, color: COLORS[index % COLORS.length] }
    })

    return (
      <div className="flex flex-col gap-4">
        <svg viewBox="0 0 200 200" className="w-full h-64">
          {segments.map((segment, idx) => {
            const radius = 80
            const startAngle = (segment.startRotation / 100) * 360
            const endAngle = (segment.endRotation / 100) * 360
            const startRad = (startAngle - 90) * (Math.PI / 180)
            const endRad = (endAngle - 90) * (Math.PI / 180)
            const x1 = 100 + radius * Math.cos(startRad)
            const y1 = 100 + radius * Math.sin(startRad)
            const x2 = 100 + radius * Math.cos(endRad)
            const y2 = 100 + radius * Math.sin(endRad)
            const largeArc = segment.percentage > 50 ? 1 : 0

            return (
              <path
                key={idx}
                d={`M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
              />
            )
          })}
        </svg>
        <div className="space-y-2">
          {segments.map((segment) => (
            <div key={segment.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: segment.color }} />
              <span className="text-sm">
                {segment.name} ({segment.percentage.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Tablero de Datos Abiertos</h1>
          <p className="text-secondary text-lg mb-12">
            Transparencia y rendición de cuentas real sobre denuncias y peticiones
          </p>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Total de Casos", value: "1,266", icon: "📊" },
              { label: "En Proceso", value: "384", icon: "⏳" },
              { label: "Resueltos", value: "281", icon: "✅" },
              { label: "Tiempo Promedio", value: "17 días", icon: "📅" },
            ].map((stat, i) => (
              <Card key={i} className="p-4">
                <p className="text-3xl mb-2">{stat.icon}</p>
                <p className="text-secondary text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* By Type */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Casos por Tipo</h3>
              {renderPieChart(publicData.byType)}
            </Card>

            {/* By Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Casos por Estado</h3>
              {renderBarChart(publicData.byStatus, Math.max(...Object.values(publicData.byStatus)))}
            </Card>

            {/* By Municipality */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Casos por Municipio</h3>
              {renderBarChart(publicData.byMunicipality, Math.max(...Object.values(publicData.byMunicipality)))}
            </Card>

            {/* Trend */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Tendencia Mensual</h3>
              <div className="space-y-2">
                {publicData.monthlyTrend.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-secondary">{item.month}</span>
                      <span className="font-bold text-primary">{item.cases}</span>
                    </div>
                    <div className="w-full bg-light rounded h-2">
                      <div
                        className="bg-blue-500 rounded h-2 transition-all"
                        style={{ width: `${(item.cases / 300) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Response Times */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Tiempo Promedio de Respuesta por Nivel</h3>
            <div className="space-y-4">
              {Object.entries(publicData.avgResponseTime).map(([level, days]) => (
                <div key={level}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-secondary">{level}</span>
                    <span className="font-bold text-primary">{days} días</span>
                  </div>
                  <div className="w-full bg-light rounded h-3">
                    <div className="bg-primary rounded h-3 transition-all" style={{ width: `${(days / 30) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
