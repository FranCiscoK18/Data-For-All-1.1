export const mockPetitions = {
  'PET-2025-001234': {
    folio: 'PET-2025-001234',
    title: 'Reparación de bache en Av. Principal',
    type: 'Queja',
    area: 'Obras Públicas',
    status: 'proceso',
    statusText: 'En Proceso',
    date: '15/01/2025',
    nextAction: 'Inspección programada para 05/02/2025',
    timeline: [
      {
        title: 'Petición Recibida',
        description: 'Su petición ha sido registrada en el sistema',
        date: '15/01/2025 10:30',
      },
      {
        title: 'Asignada a Obras Públicas',
        description: 'La petición fue asignada al área correspondiente',
        date: '16/01/2025 09:15',
      },
      {
        title: 'En Proceso',
        description: 'El equipo está evaluando la situación',
        date: '20/01/2025 14:20',
      },
    ],
  },
  'PET-2025-005678': {
    folio: 'PET-2025-005678',
    title: 'Solicitud de poda de árboles',
    type: 'Solicitud de Servicio',
    area: 'Medio Ambiente',
    status: 'asignada',
    statusText: 'Asignada',
    date: '22/01/2025',
    nextAction: 'Revisión de solicitud en proceso',
    timeline: [
      {
        title: 'Petición Recibida',
        description: 'Su petición ha sido registrada en el sistema',
        date: '22/01/2025 11:45',
      },
      {
        title: 'Asignada a Medio Ambiente',
        description: 'La petición fue asignada al área correspondiente',
        date: '23/01/2025 08:30',
      },
    ],
  },
  'PET-2025-009012': {
    folio: 'PET-2025-009012',
    title: 'Reporte de alumbrado público',
    type: 'Queja',
    area: 'Servicios Públicos',
    status: 'resuelta',
    statusText: 'Resuelta',
    date: '10/01/2025',
    nextAction: 'Caso cerrado',
    timeline: [
      {
        title: 'Petición Recibida',
        description: 'Su petición ha sido registrada en el sistema',
        date: '10/01/2025 16:20',
      },
      {
        title: 'Asignada a Servicios Públicos',
        description: 'La petición fue asignada al área correspondiente',
        date: '11/01/2025 09:00',
      },
      {
        title: 'En Proceso',
        description: 'Técnicos enviados al lugar',
        date: '12/01/2025 10:30',
      },
      {
        title: 'Resuelta',
        description: 'Luminarias reparadas y funcionando correctamente',
        date: '13/01/2025 15:45',
      },
    ],
  },
};
