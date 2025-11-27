'use client';

interface BarChartProps {
  label: string;
  value: number;
  percent: number;
}

export default function BarChart({ label, value, percent }: BarChartProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-secondary text-sm min-w-40">{label}</span>
      <div className="flex-1 flex items-center gap-4">
        <div className="flex-1 h-8 bg-light rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <span className="font-semibold min-w-12 text-right">{value}</span>
      </div>
    </div>
  );
}
