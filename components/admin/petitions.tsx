"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type H25DenunciaBasica = {
  folio_id: number;
  fecha_emision: string;
  razon_justificacion: string;
  estado_denuncia: string;
};

type H25FaltaClasif = {
  id_falta: number;
  denuncia_id: number;
  tipo_falta: string;
  area_proyecto_vinculado: string;
};

type ApiResponse = {
  h25_denuncias_bas?: H25DenunciaBasica[];
  h25_falta_clasif?: H25FaltaClasif[];
};

type DenunciaTabla = {
  id: number;
  folio: string;
  tipo: string;
  area: string;
  estado: string;
  fecha: string;
};

async function obtenerDenuncias(): Promise<ApiResponse> {
  const res = await fetch("/api/denuncias");
  if (!res.ok) {
    const text = await res.text();
    console.error("Error al llamar /api/denuncias desde Petitions:", res.status, text);
    throw new Error("No se pudieron cargar las denuncias");
  }
  return (await res.json()) as ApiResponse;
}

function getEstadoBadgeClasses(estado: string) {
  const e = estado.toLowerCase();
  if (e.includes("curso") || e.includes("proceso")) {
    return "bg-amber-100 text-amber-900";
  }
  if (e.includes("revision") || e.includes("análisis")) {
    return "bg-blue-100 text-blue-900";
  }
  if (e.includes("cerrada") || e.includes("resuelta")) {
    return "bg-green-100 text-green-900";
  }
  return "bg-slate-100 text-slate-800";
}

export default function Petitions() {
  const [denuncias, setDenuncias] = useState<DenunciaTabla[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>("todas");

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await obtenerDenuncias();

        const bas = data.h25_denuncias_bas ?? [];
        const faltas = data.h25_falta_clasif ?? [];

        const mapeadas: DenunciaTabla[] = bas.map((d) => {
          const falta = faltas.find((f) => f.denuncia_id === d.folio_id);

          // Formato de folio tipo PET-2025-00001 (solo para que se vea bonito)
          const folioFormateado = `PET-2025-${d.folio_id.toString().padStart(5, "0")}`;

          return {
            id: d.folio_id,
            folio: folioFormateado,
            tipo: falta?.tipo_falta ?? "Sin clasificar",
            area: falta?.area_proyecto_vinculado ?? "Sin área asignada",
            estado: d.estado_denuncia,
            fecha: d.fecha_emision,
          };
        });

        setDenuncias(mapeadas);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las denuncias.");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  const estadosDisponibles = useMemo(() => {
    const set = new Set<string>();
    denuncias.forEach((d) => set.add(d.estado));
    return Array.from(set);
  }, [denuncias]);

  const filtradas = useMemo(() => {
    if (filtroEstado === "todas") return denuncias;
    return denuncias.filter(
      (d) => d.estado.toLowerCase() === filtroEstado.toLowerCase()
    );
  }, [denuncias, filtroEstado]);

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Mis denuncias guardadas
          </h1>
          <p className="text-sm text-secondary">
            Visualiza y filtra las denuncias registradas en el sistema.
          </p>
        </div>

        <Button className="self-end">
          + Agregar folio
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-secondary mb-1">
              Filtro rápido
            </label>
            <Select
              value={filtroEstado}
              onValueChange={(v) => setFiltroEstado(v)}
            >
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Todas las denuncias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las denuncias</SelectItem>
                {estadosDisponibles.map((estado) => (
                  <SelectItem key={estado} value={estado}>
                    {estado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading && (
            <p className="text-xs text-secondary">Cargando denuncias…</p>
          )}
          {error && !loading && (
            <p className="text-xs text-red-600">{error}</p>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase text-secondary">
                <th className="py-2 pr-4 font-semibold">Folio</th>
                <th className="py-2 pr-4 font-semibold">Tipo</th>
                <th className="py-2 pr-4 font-semibold">Área</th>
                <th className="py-2 pr-4 font-semibold">Estado</th>
                <th className="py-2 pr-4 font-semibold">Fecha</th>
                <th className="py-2 pr-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-sm text-secondary"
                  >
                    No se encontraron denuncias con el filtro seleccionado.
                  </td>
                </tr>
              )}

              {filtradas.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
                >
                  <td className="py-3 pr-4 whitespace-nowrap font-medium text-foreground">
                    {d.folio}
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap text-foreground">
                    {d.tipo}
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap text-foreground">
                    {d.area}
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoBadgeClasses(
                        d.estado
                      )}`}
                    >
                      {d.estado}
                    </span>
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap text-foreground">
                    {d.fecha}
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap text-right">
                    <Button
                      size="sm"
                      className="bg-primary text-white hover:bg-primary/90"
                      type="button"
                      // aquí podrías abrir un modal con el detalle de la denuncia
                      onClick={() => console.log("Ver denuncia", d.id)}
                    >
                      Ver
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
