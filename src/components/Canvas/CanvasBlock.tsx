import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilderStore } from '../../store/builderStore';
import { BlockRenderer } from '../BlockRenderer/BlockRenderer';
import type { CanvasBlock } from '../../types';

interface Props {
  block: CanvasBlock;
}

export function CanvasBlockItem({ block }: Props) {
  const { selectedBlockId, selectBlock, removeBlock, moveBlock, blocks } = useBuilderStore();
  const isSelected = selectedBlockId === block.instanceId;
  const index = blocks.findIndex((b) => b.instanceId === block.instanceId);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({
    id: block.instanceId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: 'relative' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        selectBlock(block.instanceId);
      }}
      className="relative group"
    >
      {/* Drop Indicator line when dragging over this block */}
      {isOver && !isDragging && (
        <div className="absolute inset-x-0 -top-1.5 h-1 bg-violet-500 rounded-full shadow-[0_0_12px_#7c3aed] z-30 pointer-events-none flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow-md -mt-0.5">
            +
          </div>
        </div>
      )}

      {/* Selected Overlay */}
      {isSelected && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            outline: '2px solid #7c3aed',
            outlineOffset: '-2px',
          }}
        />
      )}

      {/* Toolbar */}
      <div
        className="absolute top-2 right-2 z-20 flex items-center gap-1 transition-all duration-150"
        style={{ opacity: isSelected || true ? 1 : 0 }}
      >
        {/* Drag handle */}
        <button
          {...listeners}
          {...attributes}
          title="Drag to reorder"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-xs cursor-grab active:cursor-grabbing transition-all"
          style={{
            backgroundColor: 'rgba(124,58,237,0.9)',
            color: '#fff',
            backdropFilter: 'blur(8px)',
            opacity: isSelected ? 1 : 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          ⠿
        </button>

        {/* Move Up */}
        <button
          title="Move up"
          onClick={(e) => { e.stopPropagation(); moveBlock(block.instanceId, 'up'); }}
          disabled={index === 0}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-xs transition-all disabled:opacity-20"
          style={{
            backgroundColor: 'rgba(30,32,48,0.95)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            opacity: isSelected ? 1 : 0,
          }}
        >
          ↑
        </button>

        {/* Move Down */}
        <button
          title="Move down"
          onClick={(e) => { e.stopPropagation(); moveBlock(block.instanceId, 'down'); }}
          disabled={index === blocks.length - 1}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-xs transition-all disabled:opacity-20"
          style={{
            backgroundColor: 'rgba(30,32,48,0.95)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            opacity: isSelected ? 1 : 0,
          }}
        >
          ↓
        </button>

        {/* Delete */}
        <button
          title="Delete block"
          onClick={(e) => { e.stopPropagation(); removeBlock(block.instanceId); }}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-xs transition-all hover:bg-red-500"
          style={{
            backgroundColor: 'rgba(239,68,68,0.85)',
            color: '#fff',
            backdropFilter: 'blur(8px)',
            opacity: isSelected ? 1 : 0,
          }}
        >
          ✕
        </button>
      </div>

      {/* Block Type Label */}
      {isSelected && (
        <div
          className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded text-xs font-semibold text-white"
          style={{ backgroundColor: 'rgba(124,58,237,0.9)', backdropFilter: 'blur(8px)' }}
        >
          {block.type}
        </div>
      )}

      <BlockRenderer block={block} />
    </div>
  );
}
