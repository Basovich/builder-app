import { useDraggable } from '@dnd-kit/core';
import type { BlockTemplate, BlockType } from '../../types';

interface Props {
  template: BlockTemplate;
}

function BlockMiniPreview({ type }: { type: BlockType }) {
  switch (type) {
    case 'header':
      return (
        <svg viewBox="0 0 160 50" className="w-full h-full rounded">
          <rect width="160" height="50" fill="#1e293b" rx="4" />
          <rect x="12" y="18" width="32" height="14" rx="3" fill="#a78bfa" />
          <rect x="80" y="22" width="20" height="6" rx="2" fill="#94a3b8" />
          <rect x="106" y="22" width="20" height="6" rx="2" fill="#94a3b8" />
          <rect x="132" y="22" width="16" height="6" rx="2" fill="#94a3b8" />
        </svg>
      );

    case 'footer':
      return (
        <svg viewBox="0 0 160 50" className="w-full h-full rounded">
          <rect width="160" height="50" fill="#0f172a" rx="4" />
          <rect x="12" y="16" width="28" height="10" rx="2" fill="#a78bfa" />
          <rect x="60" y="18" width="16" height="6" rx="2" fill="#64748b" />
          <rect x="82" y="18" width="24" height="6" rx="2" fill="#64748b" />
          <rect x="112" y="18" width="18" height="6" rx="2" fill="#64748b" />
          <rect x="40" y="32" width="80" height="5" rx="2" fill="#475569" />
        </svg>
      );

    case 'hero':
      return (
        <svg viewBox="0 0 160 55" className="w-full h-full rounded">
          <rect width="160" height="55" fill="#0f172a" rx="4" />
          <rect x="30" y="10" width="100" height="10" rx="3" fill="#ffffff" fillOpacity="0.9" />
          <rect x="44" y="24" width="72" height="6" rx="2" fill="#94a3b8" />
          <rect x="60" y="35" width="40" height="12" rx="4" fill="#7c3aed" />
        </svg>
      );

    case 'cta':
      return (
        <svg viewBox="0 0 160 50" className="w-full h-full rounded">
          <rect width="160" height="50" fill="#6d28d9" rx="4" />
          <rect x="36" y="12" width="88" height="10" rx="3" fill="#ffffff" />
          <rect x="48" y="26" width="64" height="6" rx="2" fill="#ddd6fe" />
          <rect x="64" y="36" width="32" height="8" rx="3" fill="#ffffff" fillOpacity="0.3" />
        </svg>
      );

    case 'features':
      return (
        <svg viewBox="0 0 160 55" className="w-full h-full rounded">
          <rect width="160" height="55" fill="#0f172a" rx="4" />
          <rect x="50" y="6" width="60" height="7" rx="2" fill="#cbd5e1" />
          {/* 3 cards */}
          <rect x="10" y="18" width="42" height="30" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <circle cx="20" cy="27" r="4" fill="#a78bfa" />
          <rect x="16" y="35" width="30" height="4" rx="1" fill="#94a3b8" />
          <rect x="16" y="41" width="22" height="3" rx="1" fill="#64748b" />

          <rect x="59" y="18" width="42" height="30" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <circle cx="69" cy="27" r="4" fill="#38bdf8" />
          <rect x="65" y="35" width="30" height="4" rx="1" fill="#94a3b8" />
          <rect x="65" y="41" width="22" height="3" rx="1" fill="#64748b" />

          <rect x="108" y="18" width="42" height="30" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <circle cx="118" cy="27" r="4" fill="#f43f5e" />
          <rect x="114" y="35" width="30" height="4" rx="1" fill="#94a3b8" />
          <rect x="114" y="41" width="22" height="3" rx="1" fill="#64748b" />
        </svg>
      );

    case 'testimonials':
      return (
        <svg viewBox="0 0 160 55" className="w-full h-full rounded">
          <rect width="160" height="55" fill="#0f172a" rx="4" />
          <rect x="52" y="6" width="56" height="7" rx="2" fill="#cbd5e1" />
          {/* 2 test cards */}
          <rect x="12" y="18" width="64" height="30" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="18" y="24" width="52" height="4" rx="1" fill="#94a3b8" />
          <circle cx="23" cy="38" r="4" fill="#a78bfa" />
          <rect x="31" y="36" width="24" height="4" rx="1" fill="#cbd5e1" />

          <rect x="84" y="18" width="64" height="30" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="90" y="24" width="52" height="4" rx="1" fill="#94a3b8" />
          <circle cx="95" cy="38" r="4" fill="#38bdf8" />
          <rect x="103" y="36" width="24" height="4" rx="1" fill="#cbd5e1" />
        </svg>
      );

    case 'pricing':
      return (
        <svg viewBox="0 0 160 55" className="w-full h-full rounded">
          <rect width="160" height="55" fill="#0f172a" rx="4" />
          {/* 3 cards */}
          <rect x="12" y="10" width="40" height="38" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="18" y="16" width="20" height="5" rx="1" fill="#94a3b8" />
          <rect x="18" y="24" width="28" height="8" rx="2" fill="#cbd5e1" />
          <rect x="18" y="38" width="28" height="5" rx="1" fill="#64748b" />

          {/* Featured Middle */}
          <rect x="60" y="6" width="40" height="42" rx="4" fill="#7c3aed" />
          <rect x="66" y="12" width="20" height="5" rx="1" fill="#ffffff" />
          <rect x="66" y="20" width="28" height="8" rx="2" fill="#ffffff" />
          <rect x="66" y="38" width="28" height="6" rx="2" fill="#ffffff" fillOpacity="0.8" />

          <rect x="108" y="10" width="40" height="38" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="114" y="16" width="20" height="5" rx="1" fill="#94a3b8" />
          <rect x="114" y="24" width="28" height="8" rx="2" fill="#cbd5e1" />
          <rect x="114" y="38" width="28" height="5" rx="1" fill="#64748b" />
        </svg>
      );

    case 'contact':
      return (
        <svg viewBox="0 0 160 55" className="w-full h-full rounded">
          <rect width="160" height="55" fill="#0f172a" rx="4" />
          <rect x="52" y="6" width="56" height="6" rx="2" fill="#cbd5e1" />
          <rect x="36" y="16" width="88" height="7" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="36" y="26" width="88" height="7" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="36" y="36" width="88" height="12" rx="3" fill="#7c3aed" />
        </svg>
      );

    case 'gallery':
      return (
        <svg viewBox="0 0 160 55" className="w-full h-full rounded">
          <rect width="160" height="55" fill="#0f172a" rx="4" />
          <rect x="12" y="10" width="40" height="16" rx="3" fill="#3b82f6" fillOpacity="0.6" />
          <rect x="60" y="10" width="40" height="16" rx="3" fill="#8b5cf6" fillOpacity="0.6" />
          <rect x="108" y="10" width="40" height="16" rx="3" fill="#ec4899" fillOpacity="0.6" />

          <rect x="12" y="30" width="40" height="16" rx="3" fill="#10b981" fillOpacity="0.6" />
          <rect x="60" y="30" width="40" height="16" rx="3" fill="#f59e0b" fillOpacity="0.6" />
          <rect x="108" y="30" width="40" height="16" rx="3" fill="#6366f1" fillOpacity="0.6" />
        </svg>
      );

    case 'slider':
      return (
        <svg viewBox="0 0 160 55" className="w-full h-full rounded">
          <rect width="160" height="55" fill="#0f172a" rx="4" />
          <rect x="10" y="8" width="140" height="38" rx="4" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1" />
          <path d="M 16 27 L 22 22 L 22 32 Z" fill="#a78bfa" />
          <path d="M 144 27 L 138 22 L 138 32 Z" fill="#a78bfa" />
          <rect x="36" y="24" width="70" height="6" rx="2" fill="#ffffff" />
          <circle cx="70" cy="40" r="2" fill="#ffffff" />
          <circle cx="80" cy="40" r="2" fill="#64748b" />
          <circle cx="90" cy="40" r="2" fill="#64748b" />
        </svg>
      );

    default:
      return null;
  }
}

export function DraggableBlock({ template }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${template.id}`,
    data: { template, source: 'sidebar' },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex flex-col gap-2 p-2.5 rounded-xl cursor-grab active:cursor-grabbing transition-all select-none group border hover:border-purple-500/40"
      style={{
        backgroundColor: isDragging ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
        borderColor: isDragging ? '#7c3aed' : 'rgba(255,255,255,0.06)',
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      {/* Mini Visual Preview */}
      <div className="w-full h-16 rounded-lg bg-[#08090d] border border-white/5 overflow-hidden p-1.5 flex items-center justify-center group-hover:border-purple-500/30 transition-colors">
        <BlockMiniPreview type={template.type} />
      </div>

      {/* Label and Icon */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm">{template.icon}</span>
          <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
            {template.label}
          </span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Drag</span>
      </div>
    </div>
  );
}
