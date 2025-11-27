'use client';

import { useState } from 'react';
import PetitionResult from './petition-result';
import { mockPetitions } from '@/lib/mock-data';

export default function TrackingSection() {
  const [folio, setFolio] = useState('');
  const [petition, setPetition] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = () => {
    const folioUpper = folio.trim().toUpperCase();
    setError(false);
    setPetition(null);

    if (!folioUpper) return;

    const found = mockPetitions[folioUpper];
    if (found) {
      setPetition(found);
    } else {
      setError(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section id="tracking" className="py-16">
      <div className="container mx-auto px-5">
        <div className="bg-white rounded-lg shadow-lg p-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-2">Consulta tu Petición</h2>
          <p className="text-secondary mb-8">Ingresa tu folio único para ver el estado de tu solicitud</p>

          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={folio}
              onChange={(e) => setFolio(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ej: PET-2025-001234"
              maxLength={20}
              className="flex-1 px-4 py-3 border-2 border-border rounded focus:outline-none focus:border-primary"
            />
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-primary-dark transition"
            >
              Buscar
            </button>
          </div>

          {petition && <PetitionResult petition={petition} />}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
              No se encontró ninguna petición con ese folio. Verifica e intenta nuevamente.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
