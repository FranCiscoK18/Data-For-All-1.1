'use client';

import { useState } from 'react';
import PetitionResult from './petition-result';
import { mockPetitions } from '@/lib/mock-data';

export default function TrackingSection() {
  const [folio, setFolio] = useState('');
  const [petition, setPetition] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const folioUpper = folio.trim().toUpperCase();

    setError(null);
    setPetition(null);

    if (!folioUpper) {
      setError('Ingresa un folio para poder buscar tu denuncia.');
      return;
    }

    const found = mockPetitions[folioUpper];

    if (!found) {
      setError(
        'No se encontró ninguna denuncia con ese folio. Verifica que esté bien escrito o que corresponda al sistema.'
      );
      return;
    }

    setPetition(found);
  };

  return (
    <section id="tracking" className="py-10 md:py-16 bg-muted/40 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white shadow-sm border border-border p-6 md:p-8">
          
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            Rastrea tu denuncia por folio
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Ingresa el folio que recibiste al presentar tu denuncia. El sistema mostrará el resumen
            del caso, la información del servidor público involucrado y el avance del proceso de
            investigación.
          </p>

          {/* FORMULARIO MEJORADO */}
          <form
            onSubmit={handleSearch}
            className="mt-5 flex flex-col md:flex-row gap-3 items-stretch md:items-center 
                       bg-white border border-[#E5D0D6] shadow-sm p-4 rounded-2xl"
          >
            <div className="flex-1">
              <label
                htmlFor="folio"
                className="block text-xs font-medium mb-1 text-[#8B1538]"
              >
                Folio de la denuncia
              </label>

              <input
                id="folio"
                type="text"
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
                placeholder="Ejemplo: PET-2025-001234"
                className="w-full px-4 py-2.5 rounded-xl border border-[#C79AA8] 
                           text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1538]/50"
              />
            </div>

            {/* BOTÓN AMIGABLE GUINDA */}
            <button
              type="submit"
              className="md:mt-5 px-5 py-2.5 rounded-xl 
                         bg-[#8B1538] text-white text-sm font-semibold
                         hover:bg-[#6e0f2b] transition shadow-sm"
            >
              Buscar folio
            </button>
          </form>

          {/* Texto de ayuda */}
          <p className="mt-2 text-xs text-muted-foreground">
            Para pruebas en el prototipo puedes usar, por ejemplo:{' '}
            <code className="font-mono bg-muted px-1.5 py-0.5 rounded">
              PET-2025-001234
            </code>{' '}
            o{' '}
            <code className="font-mono bg-muted px-1.5 py-0.5 rounded">
              PET-2025-009876
            </code>
            .
          </p>

          {/* Error */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          {/* Resultado */}
          {petition && <PetitionResult petition={petition} />}
        </div>
      </div>
    </section>
  );
}
