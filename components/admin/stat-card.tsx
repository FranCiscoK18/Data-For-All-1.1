'use client';

interface StatCardProps {
  icon: string;
  title: string;
  number: number | string;
  change: string;
}

export default function StatCard({ icon, title, number, change }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex gap-4">
      <div className="text-3xl">{icon}</div>
      <div className="flex-1">
        <h3 className="text-sm text-secondary mb-1">{title}</h3>
        <p className="text-2xl font-bold">{number}</p>
        <span className="text-sm text-secondary">{change}</span>
      </div>
    </div>
  );
}
