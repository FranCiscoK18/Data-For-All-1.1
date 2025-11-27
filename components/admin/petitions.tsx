'use client';

import { useState } from 'react';
import { mockPetitions } from '@/lib/mock-data';

export default function Petitions() {
  const [filter, setFilter] = useState('all');

  const petitionsArray = Object.values(mockPetitions);
  const filtered = filter === 'all' ? petitionsArray : petitionsArray.filter((p: any) => p.status === filter);

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
    <main className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Gestión de Peticiones</h2>
        <button className="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-primary-dark transition">
          + Nueva Petición
        </button>
      </div>

      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border-2 border-border rounded focus:outline-none focus:border-primary"
        >
          <option value="all">Todas las peticiones</option>
          <option value="recibida">Recibidas</option>
          <option value="asignada">Asignadas</option>
          <option value="proceso">En Proceso</option>
          <option value="resuelta">Resueltas</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-light border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Folio</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Tipo</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Área</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Fecha</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((petition: any) => (
              <tr key={petition.folio} className="border-b border-border hover:bg-light">
                <td className="px-6 py-4">{petition.folio}</td>
                <td className="px-6 py-4">{petition.type}</td>
                <td className="px-6 py-4">{petition.area}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(petition.status)}`}>
                    {petition.statusText}
                  </span>
                </td>
                <td className="px-6 py-4">{petition.date}</td>
                <td className="px-6 py-4">
                  <button className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-dark transition">
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
