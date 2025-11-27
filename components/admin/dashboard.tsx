'use client';

import StatCard from './stat-card';
import BarChart from './bar-chart';

export default function Dashboard() {
  const stats = [
    { icon: '📥', title: 'Total Peticiones', number: 247, change: '+12% vs mes anterior' },
    { icon: '⏳', title: 'En Proceso', number: 89, change: '36% del total' },
    { icon: '✓', title: 'Resueltas', number: 142, change: '+57% del total' },
    { icon: '⏱️', title: 'Tiempo Promedio', number: '8.5 días', change: '-2 días vs anterior' },
  ];

  const chartData = [
    { label: 'Obras Públicas', value: 68, percent: 85 },
    { label: 'Servicios Públicos', value: 56, percent: 70 },
    { label: 'Seguridad', value: 44, percent: 55 },
    { label: 'Medio Ambiente', value: 32, percent: 40 },
    { label: 'Otros', value: 47, percent: 30 },
  ];

  return (
    <main className="p-8">
      <h2 className="text-3xl font-bold mb-8">Dashboard General</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h3 className="text-xl font-bold mb-8">Peticiones por Área</h3>
        <div className="space-y-6">
          {chartData.map((item, index) => (
            <BarChart key={index} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}
