import { Complaint } from '@/lib/complaints-data';

interface ComplaintCardProps {
  complaint: Complaint;
}

export default function ComplaintCard({ complaint }: ComplaintCardProps) {
  const statusColors: { [key: string]: string } = {
    abierta: 'bg-warning/10 text-warning border-warning/20',
    'en-proceso': 'bg-primary/10 text-primary border-primary/20',
    resuelta: 'bg-success/10 text-success border-success/20',
    cerrada: 'bg-secondary/10 text-secondary border-secondary/20',
  };

  const priorityDot: { [key: string]: string } = {
    alta: 'bg-danger',
    media: 'bg-warning',
    baja: 'bg-success',
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-border hover:border-primary cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${priorityDot[complaint.priority]}`}></div>
            <span className="text-xs font-semibold text-secondary uppercase">{complaint.folio}</span>
          </div>
          <h3 className="text-lg font-bold text-foreground hover:text-primary transition">{complaint.title}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[complaint.status]} border`}>
          {complaint.status}
        </span>
      </div>

      <p className="text-foreground text-sm mb-4 line-clamp-2">{complaint.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-secondary font-medium">Categoría</p>
          <p className="text-sm font-semibold text-foreground">{complaint.category}</p>
        </div>
        <div>
          <p className="text-xs text-secondary font-medium">Ubicación</p>
          <p className="text-sm font-semibold text-foreground truncate">{complaint.location}</p>
        </div>
        <div>
          <p className="text-xs text-secondary font-medium">Reportado por</p>
          <p className="text-sm font-semibold text-foreground">{complaint.reportedBy}</p>
        </div>
        <div>
          <p className="text-xs text-secondary font-medium">Fecha</p>
          <p className="text-sm font-semibold text-foreground">{new Date(complaint.createdAt).toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
}
