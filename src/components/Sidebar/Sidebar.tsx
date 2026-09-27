import { useState } from 'react';
import { DraggableBlock } from './DraggableBlock';
import { blockTemplates, categories } from '../../data/blockTemplates';
import type { CategoryType } from '../../types';

export function Sidebar() {
  const [search, setSearch] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>('Layout');

  const toggleCategory = (name: string) => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  const filtered = blockTemplates.filter((t) =>
    t.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside
      className="flex flex-col h-full overflow-hidden shrink-0 select-none"
      onClick={(e) => e.stopPropagation()}
      style={{
        width: 270,
        minWidth: 270,
        backgroundColor: '#111318',
        borderRight: '1px solid #1e2130',
      }}
    >
      {/* Header */}
      <div className="px-4 py-4" style={{ borderBottom: '1px solid #1e2130' }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Blocks</p>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search blocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-lg text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          />
        </div>
      </div>

      {/* Block List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {search ? (
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-sm text-slate-600 text-center py-8">No blocks found</p>
            ) : (
              filtered.map((t) => <DraggableBlock key={t.id} template={t} />)
            )}
          </div>
        ) : (
          categories.map((cat) => {
            const catBlocks = blockTemplates.filter((t) => t.category === cat.name as CategoryType);
            if (catBlocks.length === 0) return null;
            const isOpen = openCategory === cat.name;

            return (
              <div key={cat.name} className="border-b border-white/5 last:border-b-0 pb-1">
                <button
                  onClick={() => toggleCategory(cat.name)}
                  className="w-full flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{cat.icon}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-slate-200">
                      {cat.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-slate-500">
                      {catBlocks.length}
                    </span>
                  </div>
                  <span
                    className="text-slate-500 text-xs transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  >
                    ▶
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-1 mb-2 space-y-2 pl-1 pr-1">
                    {catBlocks.map((t) => (
                      <DraggableBlock key={t.id} template={t} />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
