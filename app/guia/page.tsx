"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { steps } from "@/lib/data"
import { Card } from "@/components/ui/card"

export default function GuiaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Guía Paso a Paso</h1>
          <p className="text-secondary text-lg mb-12">
            Todo lo que necesitas saber sobre denuncias, quejas y peticiones
          </p>

          <div className="space-y-6">
            {steps.map((step) => (
              <Card key={step.number} className="p-6 border-l-4 border-l-primary">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-secondary mb-4">{step.description}</p>
                    <div className="bg-light rounded p-4">
                      <h4 className="font-semibold text-sm mb-2 text-foreground">💡 Tips útiles:</h4>
                      <ul className="space-y-1 text-sm">
                        {step.tips.map((tip, i) => (
                          <li key={i} className="text-secondary">
                            ✓ {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 mt-12 bg-blue-50 border-primary">
            <h3 className="text-lg font-semibold text-foreground mb-3">📋 Recordar siempre:</h3>
            <ul className="space-y-2 text-secondary">
              <li>✓ Guarda tu folio - es tu comprobante oficial</li>
              <li>✓ Verifica el estado regularmente usando tu folio</li>
              <li>✓ No compartas datos personales sensibles a menos que sea obligatorio</li>
              <li>✓ Si no hay respuesta en el tiempo estimado, puedes escalar tu caso</li>
              <li>✓ Busca asesoría gratuita si lo necesitas</li>
            </ul>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
