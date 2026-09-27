import { useBuilderStore } from '../../store/builderStore';
import type { ViewportType } from '../../types';

const viewports: { type: ViewportType; icon: string; label: string; width: string }[] = [
  { type: 'desktop', icon: '🖥️', label: 'Desktop', width: '1280px' },
  { type: 'tablet', icon: '📱', label: 'Tablet', width: '768px' },
  { type: 'mobile', icon: '📲', label: 'Mobile', width: '375px' },
];

export function ViewportToggle() {
  const { viewport, setViewport } = useBuilderStore();

  return (
    <div
      className="flex items-center gap-1 p-1 rounded-xl"
      style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {viewports.map((v) => {
        const active = viewport === v.type;
        return (
          <button
            key={v.type}
            onClick={() => setViewport(v.type)}
            title={`${v.label} (${v.width})`}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: active ? '#7c3aed' : 'transparent',
              color: active ? '#fff' : '#94a3b8',
            }}
          >
            <span className="text-base leading-none">{v.icon}</span>
            <span className="text-xs hidden sm:block">{v.label}</span>
          </button>
        );
      })}
    </div>
  );
}
