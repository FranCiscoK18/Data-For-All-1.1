// lib/mock-data.ts

export type DenunciaDetallada = {
  folio: string;
  basicos: {
    fechaEmision: string;
    motivo: string;
    estadoActual: 'Cerrada' | 'En curso' | 'En revisión' | string;
  };
  servidorPublico: {
    alcaldiaOrganismo: string;
    cargo: string;
    tipoFalta: string;
    unidadInvestigadora: string;
    idDenuncia: string;
  };
  denunciante: {
    esAnonimo: boolean;
    calidad: string; // ciudadano afectado, servidor público, testigo, etc.
    organoControl: string;
    descripcion?: string;
  };
  clasificacion: {
    tipoFalta: string; // administrativa, ética, corrupción, abuso, etc.
    area: string; // área o dependencia donde ocurrió
  };
  investigacion: {
    plazosLegales: string;
    medidasCautelares: string;
    relacionConDenuncia: string;
    etapaActual: string;
  };
  timeline: {
    title: string;
    description: string;
    date: string;
  }[];
};
// lib/mock-data.ts

export const mockPetitions: Record<string, DenunciaDetallada> = {
  'PET-2025-001234': {
    folio: 'PET-2025-001234',
    basicos: {
      fechaEmision: '15/01/2025',
      motivo: 'Posible acto de corrupción en la asignación de contratos de obra pública.',
      estadoActual: 'En curso',
    },
    servidorPublico: {
      alcaldiaOrganismo: 'Alcaldía Benito Juárez',
      cargo: 'Director de Obras Públicas',
      tipoFalta: 'Corrupción',
      unidadInvestigadora: 'Unidad de Asuntos Internos',
      idDenuncia: 'H25-2025-0001',
    },
    denunciante: {
      esAnonimo: false,
      calidad: 'Ciudadano afectado',
      organoControl: 'Órgano Interno de Control de la Alcaldía Benito Juárez',
      descripcion: 'Persona que reporta retrasos injustificados y sobrecostos en obra pública.',
    },
    clasificacion: {
      tipoFalta: 'Administrativa grave',
      area: 'Obras Públicas y Contrataciones',
    },
    investigacion: {
      plazosLegales: 'Plazo máximo de 90 días hábiles para la investigación preliminar.',
      medidasCautelares:
        'Solicitud de suspensión temporal del servidor público mientras dure la investigación.',
      relacionConDenuncia:
        'La investigación se abrió derivado de la denuncia ciudadana PET-2025-001234.',
      etapaActual: 'Integración de pruebas y testimonios.',
    },
    timeline: [
      {
        title: 'Denuncia recibida',
        description: 'La denuncia fue registrada en el sistema de atención ciudadana.',
        date: '15/01/2025 10:30',
      },
      {
        title: 'Turnada a Unidad Investigadora',
        description:
          'El caso se envió a la Unidad de Asuntos Internos de la Alcaldía para su análisis.',
        date: '17/01/2025 09:00',
      },
      {
        title: 'Investigación en curso',
        description:
          'Se solicitaron documentos de los contratos y se programaron entrevistas con testigos.',
        date: '25/01/2025 12:15',
      },
    ],
  },

  'PET-2025-009876': {
    folio: 'PET-2025-009876',
    basicos: {
      fechaEmision: '10/01/2025',
      motivo: 'Maltrato y abuso de autoridad hacia personal subordinado.',
      estadoActual: 'Cerrada',
    },
    servidorPublico: {
      alcaldiaOrganismo: 'Secretaría de Seguridad Ciudadana',
      cargo: 'Jefe de sector',
      tipoFalta: 'Abuso de autoridad',
      unidadInvestigadora: 'Dirección General de Asuntos Internos',
      idDenuncia: 'H25-2025-0045',
    },
    denunciante: {
      esAnonimo: true,
      calidad: 'Denuncia anónima',
      organoControl: 'Órgano Interno de Control de la Secretaría',
      descripcion: 'Se recibieron varios reportes anónimos sobre el mismo servidor público.',
    },
    clasificacion: {
      tipoFalta: 'Falta ética y abuso',
      area: 'Jefatura de sector policial',
    },
    investigacion: {
      plazosLegales:
        'La investigación se condujo en un plazo de 60 días naturales conforme a la normativa.',
      medidasCautelares: 'Reubicación temporal del personal reportante para proteger su integridad.',
      relacionConDenuncia:
        'La investigación se abrió con base en múltiples denuncias anónimas que describían el mismo patrón de conducta.',
      etapaActual: 'Concluida, con sanción impuesta.',
    },
    timeline: [
      {
        title: 'Denuncia anónima recibida',
        description: 'El sistema registró la denuncia anónima con folio PET-2025-009876.',
        date: '10/01/2025 08:20',
      },
      {
        title: 'Inicio de investigación',
        description:
          'Se integró el expediente y se citaron a posibles testigos para recabar información.',
        date: '15/01/2025 11:00',
      },
      {
        title: 'Medidas cautelares',
        description:
          'Se aplicaron medidas para evitar represalias contra el personal subordinado.',
        date: '20/01/2025 09:30',
      },
      {
        title: 'Resolución',
        description:
          'Se determinó la responsabilidad del servidor público y se impuso sanción administrativa.',
        date: '05/02/2025 16:10',
      },
    ],
  },
};
