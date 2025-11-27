"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { recommendedPlatforms } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type CaseType = "corruption" | "poorService" | "information" | "procedure" | "abuse" | null
type Scope = "federal" | "state" | "municipal" | null

export default function OrientadorPage() {
  const [step, setStep] = useState(1)
  const [caseType, setCaseType] = useState<CaseType>(null)
  const [scope, setScope] = useState<Scope>(null)
  const [result, setResult] = useState(null)

  const caseTypeMap = {
    corruption: "corruption",
    poorService: "poorService",
    information: "information",
  }

  const handleNext = () => {
    if (step === 1 && caseType) setStep(2)
    if (step === 2 && scope) {
      const mapped = caseTypeMap[caseType as keyof typeof caseTypeMap]
      setResult(recommendedPlatforms[mapped as keyof typeof recommendedPlatforms]?.[scope])
      setStep(3)
    }
  }

  const handleReset = () => {
    setStep(1)
    setCaseType(null)
    setScope(null)
    setResult(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">¿Dónde Denuncio?</h1>
          <p className="text-secondary text-lg mb-8">Orientador Inteligente para encontrar la plataforma correcta</p>

          {/* Step 1: Case Type */}
          {step === 1 && (
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-6">¿Qué tipo de problema quieres reportar?</h2>
              <div className="space-y-3">
                {[
                  { id: "corruption", label: "Corrupción o acto ilícito" },
                  { id: "poorService", label: "Mal servicio público" },
                  { id: "information", label: "Acceso a información pública" },
                  { id: "procedure", label: "Problema en un trámite" },
                  { id: "abuse", label: "Abuso de autoridad" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setCaseType(option.id as CaseType)}
                    className={`w-full p-4 text-left rounded border-2 transition ${
                      caseType === option.id ? "border-primary bg-blue-50" : "border-border hover:border-primary"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Step 2: Scope */}
          {step === 2 && (
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-6">¿A qué nivel está la instancia responsable?</h2>
              <div className="space-y-3">
                {[
                  { id: "federal", label: "Federal - Institución nacional" },
                  { id: "state", label: "Estatal - Gobierno de Quintana Roo" },
                  { id: "municipal", label: "Municipal - Ayuntamiento local" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setScope(option.id as Scope)}
                    className={`w-full p-4 text-left rounded border-2 transition ${
                      scope === option.id ? "border-primary bg-blue-50" : "border-border hover:border-primary"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Step 3: Result */}
          {step === 3 && result && (
            <Card className="p-6 mb-6 border-2 border-success">
              <div className="bg-green-50 border border-success rounded p-4 mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Plataforma Recomendada</h3>
                <p className="text-lg font-bold text-primary mb-4">{result.name}</p>
                <p className="text-secondary mb-4">
                  Tiempo promedio de respuesta: <strong>{result.avgTime}</strong>
                </p>
              </div>

              <h4 className="font-semibold mb-3">Requisitos mínimos:</h4>
              <ul className="list-disc list-inside space-y-2 mb-6 text-secondary">
                {result.minRequirements.map((req: string, i: number) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>

              <div className="flex gap-3">
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-success hover:bg-green-600">Ir a la plataforma oficial</Button>
                </a>
                <Link href="/guia">
                  <Button variant="outline">Ver guía paso a paso</Button>
                </Link>
              </div>
            </Card>
          )}

          {/* Navigation */}
          {step < 3 && (
            <div className="flex gap-3 mb-6">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Atrás
                </Button>
              )}
              <Button onClick={handleNext} disabled={(!caseType && step === 1) || (!scope && step === 2)}>
                Siguiente
              </Button>
            </div>
          )}

          {step === 3 && (
            <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
              Hacer nueva búsqueda
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
