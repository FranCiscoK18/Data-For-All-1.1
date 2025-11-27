// lib/complaints-data.ts

export type CaseScope = "federal" | "state" | "municipal"
export type CaseStatus = "recibida" | "en-analisis" | "canalizada" | "en-proceso" | "concluida"

export interface Complaint {
  id: string
  folio: string

  // Datos permitidos (públicos / abiertos / no sensibles)
  title: string
  caseType: "denuncia" | "queja" | "peticion" | "tramite"
  scope: CaseScope
  institution: string
  state: string
  municipality?: string

  status: CaseStatus
  channel: "web" | "telefono" | "presencial" | "correo" | "otro"
  createdAt: string
  updatedAt: string

  timeline: Array<{
    date: string
    status: CaseStatus
    note: string
  }>

  /**
   * Campos sensitivos del prototipo antiguo:
   * los dejamos opcionales para no romper el dashboard admin DEMO,
   * pero NO se deben mostrar en módulo ciudadano.
   */
  description?: string
  location?: string
  reportedBy?: string
  email?: string
  phone?: string
  priority?: "alta" | "media" | "baja"
  evidence?: string[]
}

/**
 * Datos mock basados en estructura permitida.
 * Puedes ajustarlos a tu narrativa.
 */
export const mockComplaints: Complaint[] = [
  {
    id: "1",
    folio: "SIDEC-2025-001",
    title: "Posible acto de corrupción en trámite federal",
    caseType: "denuncia",
    scope: "federal",
    institution: "Secretaría de la Función Pública",
    state: "Quintana Roo",
    municipality: "Benito Juárez",
    status: "en-analisis",
    channel: "web",
    createdAt: "2025-01-10T10:30:00Z",
    updatedAt: "2025-01-14T09:00:00Z",
    timeline: [
      {
        date: "2025-01-10T10:30:00Z",
        status: "recibida",
        note: "Caso recibido en plataforma oficial."
      },
      {
        date: "2025-01-12T13:00:00Z",
        status: "en-analisis",
        note: "Asignado a área investigadora."
      }
    ]
  },
  {
    id: "2",
    folio: "PCDA-QR-2025-002",
    title: "Denuncia estatal anticorrupción",
    caseType: "denuncia",
    scope: "state",
    institution: "Sistema Anticorrupción Quintana Roo",
    state: "Quintana Roo",
    municipality: "Othón P. Blanco",
    status: "canalizada",
    channel: "web",
    createdAt: "2025-02-05T16:20:00Z",
    updatedAt: "2025-02-08T18:45:00Z",
    timeline: [
      {
        date: "2025-02-05T16:20:00Z",
        status: "recibida",
        note: "Caso recibido en plataforma estatal."
      },
      {
        date: "2025-02-08T18:45:00Z",
        status: "canalizada",
        note: "Canalizada a contraloría correspondiente."
      }
    ]
  },
  {
    id: "3",
    folio: "MUN-BJ-2025-003",
    title: "Queja por mal servicio municipal",
    caseType: "queja",
    scope: "municipal",
    institution: "Ayuntamiento de Benito Juárez",
    state: "Quintana Roo",
    municipality: "Benito Juárez",
    status: "en-proceso",
    channel: "telefono",
    createdAt: "2025-03-01T09:10:00Z",
    updatedAt: "2025-03-04T15:00:00Z",
    timeline: [
      {
        date: "2025-03-01T09:10:00Z",
        status: "recibida",
        note: "Reporte registrado vía telefónica."
      },
      {
        date: "2025-03-02T11:00:00Z",
        status: "en-proceso",
        note: "Área municipal inició seguimiento."
      }
    ]
  }
]
