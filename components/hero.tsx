'use client';

export default function Hero() {
  const handleScroll = () => {
    const element = document.getElementById('tracking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
      <div className="container mx-auto px-5 text-center">
        <h2 className="text-5xl font-bold mb-4">Seguimiento Transparente de Peticiones Ciudadanas</h2>
        <p className="text-xl mb-8 opacity-90">Consulta el estado de tus peticiones, quejas y trámites en tiempo real</p>
        <button
          onClick={handleScroll}
          className="bg-white text-primary px-8 py-3 rounded font-semibold hover:shadow-lg transition"
        >
          Rastrear mi Petición
        </button>
      </div>
    </section>
  );
}
