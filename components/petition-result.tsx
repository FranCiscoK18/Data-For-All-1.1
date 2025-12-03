'use client';

type PetitionResultProps = {
  petition: any; // si quieres, puedes importar y usar DenunciaDetallada aquí
};

export default function PetitionResult({ petition }: PetitionResultProps) {
  const { folio, basicos, servidorPublico, denunciante, clasificacion, investigacion, timeline } =
    petition || {};

  const getStatusColor = (estado: string) => {
    const normalized = (estado || '').toLowerCase();
    if (normalized.includes('cerrad')) return 'bg-green-100 text-green-900';
    if (normalized.includes('curso')) return 'bg-amber-100 text-amber-900';
    if (normalized.includes('revisión') || normalized.includes('revision'))
      return 'bg-blue-100 text-blue-900';
    return 'bg-gray-100 text-gray-900';
  };

  return (
    <div className="mt-8 pt-8 border-t-2 border-border">
      {/* Encabezado principal */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Detalle de la denuncia con folio{' '}
            <span className="font-mono bg-muted px-2 py-0.5 rounded">{folio}</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Información obtenida a partir de los módulos de la API: datos básicos, servidor público,
            denunciante y proceso de investigación.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2">
          {basicos?.estadoActual && (
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                basicos.estadoActual,
              )}`}
            >
              Estado actual: {basicos.estadoActual}
            </span>
          )}
          {basicos?.fechaEmision && (
            <span className="text-xs text-muted-foreground">
              Fecha de emisión: <strong>{basicos.fechaEmision}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Bloques principales de información */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Resumen de la denuncia */}
        <div className="p-4 rounded-xl border bg-muted/40">
          <h4 className="text-sm font-semibold text-secondary mb-2">Resumen de la denuncia</h4>
          <div className="space-y-1 text-sm">
            <DetailItem label="Motivo principal" value={basicos?.motivo || 'No disponible'} />
            <DetailItem
              label="Tipo de falta"
              value={clasificacion?.tipoFalta || servidorPublico?.tipoFalta || 'No especificado'}
            />
            <DetailItem
              label="Área donde ocurrió"
              value={clasificacion?.area || 'Área no registrada'}
            />
          </div>
        </div>

        {/* Información del servidor público denunciado */}
        <div className="p-4 rounded-xl border bg-muted/40">
          <h4 className="text-sm font-semibold text-secondary mb-2">
            Servidor público denunciado
          </h4>
          <div className="space-y-1 text-sm">
            <DetailItem
              label="Alcaldía / organismo"
              value={servidorPublico?.alcaldiaOrganismo || 'No registrado'}
            />
            <DetailItem label="Cargo" value={servidorPublico?.cargo || 'No registrado'} />
            <DetailItem
              label="Unidad investigadora"
              value={servidorPublico?.unidadInvestigadora || 'No disponible'}
            />
            <DetailItem
              label="ID de denuncia en sistema"
              value={servidorPublico?.idDenuncia || 'Sin ID asociado'}
            />
          </div>
        </div>
      </div>

      {/* Denunciante + Clasificación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Calidad del denunciante */}
        <div className="p-4 rounded-xl border bg-muted/40">
          <h4 className="text-sm font-semibold text-secondary mb-2">
            Calidad del denunciante
          </h4>
          <div className="space-y-1 text-sm">
            <DetailItem
              label="¿Denuncia anónima?"
              value={denunciante?.esAnonimo ? 'Sí, es anónima' : 'No, denuncia identificada'}
            />
            <DetailItem
              label="Calidad del denunciante"
              value={denunciante?.calidad || 'No especificada'}
            />
            <DetailItem
              label="Órgano de control"
              value={denunciante?.organoControl || 'No indicado'}
            />
            {denunciante?.descripcion && (
              <DetailItem label="Descripción" value={denunciante.descripcion} />
            )}
          </div>
        </div>

        {/* Proceso de investigación */}
        <div className="p-4 rounded-xl border bg-muted/40">
          <h4 className="text-sm font-semibold text-secondary mb-2">
            Proceso de investigación
          </h4>
          <div className="space-y-1 text-sm">
            <DetailItem
              label="Etapa actual"
              value={investigacion?.etapaActual || 'Etapa no disponible'}
            />
            <DetailItem
              label="Plazos legales"
              value={investigacion?.plazosLegales || 'No se especifican plazos'}
            />
            <DetailItem
              label="Medidas cautelares"
              value={investigacion?.medidasCautelares || 'No se reportan medidas cautelares'}
            />
            <DetailItem
              label="Relación con la denuncia"
              value={investigacion?.relacionConDenuncia || 'Sin descripción'}
            />
          </div>
        </div>
      </div>

      {/* Línea de tiempo */}
      {Array.isArray(timeline) && timeline.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-secondary mb-3">
            Línea de tiempo del trámite
          </h4>
          <ol className="relative border-l border-border space-y-4 pl-4 text-sm">
            {timeline.map((step: any, index: number) => (
              <li key={index} className="ml-2">
                <div className="absolute -left-[7px] mt-1 w-3 h-3 rounded-full bg-primary" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-foreground">{step.title}</span>
                  <span className="text-xs text-muted-foreground">{step.date}</span>
                  <p className="text-sm text-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm leading-tight">
      <span className="font-semibold text-[#8B1538]">{label}: </span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

