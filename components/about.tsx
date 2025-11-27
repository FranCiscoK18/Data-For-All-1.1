'use client';

export default function About() {
  const features = [
    {
      icon: '📊',
      title: 'Transparencia',
      description: 'Seguimiento en tiempo real del estado de tus peticiones y solicitudes',
    },
    {
      icon: '⚡',
      title: 'Eficiencia',
      description: 'Reducción de consultas repetitivas a las Unidades de Transparencia',
    },
    {
      icon: '🔒',
      title: 'Seguridad',
      description: 'Acceso seguro mediante folio único para proteger tu información',
    },
    {
      icon: '📈',
      title: 'Rendición de Cuentas',
      description: 'Métricas de desempeño y tiempos de respuesta por área',
    },
  ];

  return (
    <section id="about" className="bg-white py-16">
      <div className="container mx-auto px-5">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">Acerca de DATA FOR ALL</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-light p-8 rounded-lg text-center hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
