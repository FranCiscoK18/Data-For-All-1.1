'use client';

export default function Metrics() {
  return (
    <main className="p-8">
      <h2 className="text-3xl font-bold mb-8">Métricas de Rendimiento</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h3 className="text-xl font-bold mb-6">Tiempo Promedio por Tipo</h3>
          <div className="space-y-4">
            <MetricItem label="Queja" value="7.2 días" />
            <MetricItem label="Solicitud de Servicio" value="9.8 días" />
            <MetricItem label="Información" value="5.1 días" />
            <MetricItem label="Sugerencia" value="12.3 días" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold mb-8">Tasa de Resolución</h3>
          <div className="w-40 h-40 relative flex items-center justify-center mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f0f0f0" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#10b981"
                strokeWidth="10"
                strokeDasharray="282.7"
                strokeDashoffset="70.7"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute text-3xl font-bold">75%</div>
          </div>
          <p className="text-center text-secondary">Peticiones resueltas en el plazo establecido</p>
        </div>
      </div>
    </main>
  );
}

function MetricItem({ label, value }: any) {
  return (
    <div className="flex justify-between p-3 bg-light rounded">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
