import { useState } from 'react';
import { useBuilderStore } from '../../store/builderStore';
import { exportSite } from '../../utils/exportHtml';

export function Topbar() {
  const { blocks } = useBuilderStore();
  const [projectName, setProjectName] = useState('AVAG Modelle');
  const [isExporting, setIsExporting] = useState(false);
  const [editingName, setEditingName] = useState(false);

  const handleExport = async () => {
    if (blocks.length === 0) return;
    setIsExporting(true);
    try {
      await exportSite(blocks, projectName);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header
      className="flex items-center justify-between px-5 shrink-0"
      style={{
        height: 56,
        backgroundColor: '#111318',
        borderBottom: '1px solid #1e2130',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-md"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
        >
          AM
        </div>
        <span className="text-sm font-bold text-white tracking-wide">AVAG Modelle</span>
        <div className="w-px h-4 bg-slate-700 mx-1" />
        {editingName ? (
          <input
            autoFocus
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onBlur={() => setEditingName(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditingName(false)}
            className="text-sm text-white bg-transparent border-b border-violet-500 focus:outline-none px-1"
            style={{ minWidth: 160 }}
          />
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="text-sm text-slate-400 hover:text-white transition-colors"
            title="Click to rename"
          >
            {projectName}
          </button>
        )}
      </div>

      {/* Right: Block count + Export */}
      <div className="flex items-center gap-3">
        {blocks.length > 0 && (
          <span className="text-xs text-slate-500">
            {blocks.length} block{blocks.length !== 1 ? 's' : ''}
          </span>
        )}

        <button
          onClick={handleExport}
          disabled={blocks.length === 0 || isExporting}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: blocks.length === 0 ? 'rgba(124,58,237,0.3)' : 'linear-gradient(135deg, #7c3aed, #a855f7)',
            color: '#fff',
            boxShadow: blocks.length > 0 ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
          }}
          title={blocks.length === 0 ? 'Add blocks to export' : 'Export as ZIP'}
        >
          {isExporting ? (
            <>
              <span className="animate-spin">⏳</span>
              Exporting...
            </>
          ) : (
            <>
              <span>⬇️</span>
              Export
            </>
          )}
        </button>
      </div>
    </header>
  );
}
