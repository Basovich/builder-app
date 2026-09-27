import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useBuilderStore } from '../../store/builderStore';
import { CanvasBlockItem } from './CanvasBlock';
import { ViewportToggle } from './ViewportToggle';

export function Canvas() {
  const { blocks, viewport } = useBuilderStore();
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-drop' });

  const viewportWidths: Record<string, string> = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const width = viewportWidths[viewport];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden" style={{ backgroundColor: '#0a0b0f' }}>
      {/* Viewport Toggle */}
      <div
        className="flex items-center justify-center py-3 shrink-0"
        style={{ borderBottom: '1px solid #1e2130', backgroundColor: '#111318' }}
      >
        <ViewportToggle />
      </div>

      {/* Canvas Scroll Area */}
      <div className="flex-1 overflow-auto p-6">
        <div
          className="mx-auto transition-all duration-300 shadow-2xl"
          style={{
            width,
            minWidth: viewport === 'desktop' ? '100%' : width,
            maxWidth: '100%',
          }}
        >
          {/* Drop Zone */}
          <div
            ref={setNodeRef}
            className="@container min-h-screen rounded-xl overflow-x-hidden transition-all"
            style={{
              backgroundColor: '#ffffff',
              outline: isOver ? '2px dashed #7c3aed' : '2px dashed transparent',
              outlineOffset: '-2px',
              containerType: 'inline-size',
            }}
          >
            {blocks.length === 0 ? (
              <EmptyCanvas isOver={isOver} />
            ) : (
              <SortableContext
                items={blocks.map((b) => b.instanceId)}
                strategy={verticalListSortingStrategy}
              >
                {blocks.map((block) => (
                  <CanvasBlockItem key={block.instanceId} block={block} />
                ))}
              </SortableContext>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCanvas({ isOver }: { isOver: boolean }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-4 transition-all duration-300"
      style={{ backgroundColor: isOver ? 'rgba(124,58,237,0.05)' : 'transparent' }}
    >
      <div className="text-6xl mb-2">🎨</div>
      <h3 className="text-xl font-semibold text-slate-400">Drop blocks here</h3>
      <p className="text-sm text-slate-500 text-center max-w-xs">
        Drag blocks from the left panel and drop them here to build your page
      </p>
      {isOver && (
        <div
          className="mt-4 px-6 py-3 rounded-full text-sm font-medium text-violet-300"
          style={{ backgroundColor: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)' }}
        >
          Release to add block
        </div>
      )}
    </div>
  );
}
