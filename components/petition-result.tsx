'use client';

export default function PetitionResult({ petition }: any) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      recibida: 'bg-blue-100 text-blue-900',
      asignada: 'bg-amber-100 text-amber-900',
      proceso: 'bg-amber-100 text-amber-900',
      resuelta: 'bg-green-100 text-green-900',
    };
    return colors[status] || 'bg-gray-100 text-gray-900';
  };

  return (
    <div className="mt-8 pt-8 border-t-2 border-border">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold">{petition.title}</h3>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(petition.status)}`}>
          {petition.statusText}
        </span>
      </div>

      <div className="bg-light rounded-lg p-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <DetailItem label="Folio:" value={petition.folio} />
          <DetailItem label="Tipo:" value={petition.type} />
          <DetailItem label="Área Asignada:" value={petition.area} />
          <DetailItem label="Fecha de Registro:" value={petition.date} />
          <DetailItem label="Próxima Acción:" value={petition.nextAction} colSpan />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-6">Historial de Actualizaciones</h4>
        <div className="space-y-6">
          {petition.timeline.map((item: any, index: number) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0"></div>
                {index !== petition.timeline.length - 1 && (
                  <div className="w-0.5 h-12 bg-border mt-2"></div>
                )}
              </div>
              <div className="pb-6">
                <h5 className="font-semibold">{item.title}</h5>
                <p className="text-secondary text-sm">{item.description}</p>
                <div className="text-secondary text-sm mt-1">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, colSpan }: any) {
  return (
    <div className={colSpan ? 'col-span-2' : ''}>
      <span className="font-semibold text-secondary">{label}</span>
      <div className="text-foreground">{value}</div>
    </div>
  );
}
