'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { validateCredentials, mockUsers } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = validateCredentials(email, password);

    if (user) {
      // Guardar token en cookies
      document.cookie = `auth-token=${user.id}; path=/; max-age=${7 * 24 * 60 * 60}`;
      document.cookie = `user-email=${user.email}; path=/; max-age=${7 * 24 * 60 * 60}`;
      document.cookie = `user-name=${user.name}; path=/; max-age=${7 * 24 * 60 * 60}`;
      document.cookie = `user-role=${user.role}; path=/; max-age=${7 * 24 * 60 * 60}`;
      router.push('/denuncias');
    } else {
      setError('Email o contraseña incorrectos');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Iniciar Sesión</h1>
          <p className="text-center text-secondary mb-8">Sistema de Denuncias Ciudadanas</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="bg-danger bg-opacity-10 text-danger px-4 py-2 rounded-lg text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition disabled:opacity-50"
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-light rounded-lg">
            <p className="text-sm font-medium mb-2">Credenciales de prueba:</p>
            <p className="text-xs text-secondary mb-1">
              <strong>Ciudadano:</strong> citizen@example.com / password123
            </p>
            <p className="text-xs text-secondary">
              <strong>Admin:</strong> admin@example.com / admin123
            </p>
          </div>

          <p className="text-center text-sm mt-6">
            ¿No tienes cuenta?{' '}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
