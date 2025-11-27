import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DATA FOR ALL - Peticiones Ciudadanas',
  description: 'Plataforma de seguimiento transparente de peticiones ciudadanas',
    generator: 'v0.app'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
