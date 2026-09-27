import { useDraggable } from '@dnd-kit/core';
import type { BlockTemplate } from '../../types';

interface Props {
  template: BlockTemplate;
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
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-grab active:cursor-grabbing transition-all select-none group"
      style={{
        backgroundColor: isDragging ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.04)',
        border: isDragging ? '1px solid rgba(124,58,237,0.5)' : '1px solid rgba(255,255,255,0.06)',
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(0.97)' : 'scale(1)',
      }}
    >
      <span className="text-xl leading-none">{template.icon}</span>
      <span className="text-sm text-slate-300 group-hover:text-white transition-colors font-medium">
        {template.label}
      </span>
    </div>
  );
}
