'use client';

export default function AdminNavbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-5 py-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary">DATA FOR ALL</h1>
            <p className="text-sm text-secondary">Panel Administrativo</p>
          </div>
          <div className="flex gap-8">
            <a href="/" className="nav-link">
              Volver al Inicio
            </a>
            <button className="nav-link">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
