'use client';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'petitions', label: 'Peticiones', icon: '📋' },
    { id: 'metrics', label: 'Métricas', icon: '📈' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-border">
      <div className="p-0">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full text-left px-6 py-4 flex items-center gap-3 transition ${
              activeSection === item.id
                ? 'bg-light text-primary border-l-4 border-primary'
                : 'text-foreground hover:bg-light'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
