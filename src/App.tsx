import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import { Topbar } from './components/Topbar/Topbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Canvas } from './components/Canvas/Canvas';
import { PropertiesPanel } from './components/PropertiesPanel/PropertiesPanel';
import { useBuilderStore } from './store/builderStore';
import type { BlockTemplate } from './types';

export default function App() {
  const { addBlock, blocks, reorderBlocks, selectBlock } = useBuilderStore();
  const [activeDragTemplate, setActiveDragTemplate] = useState<BlockTemplate | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.source === 'sidebar') {
      setActiveDragTemplate(data.template as BlockTemplate);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragTemplate(null);
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;

    // Drop from sidebar onto canvas
    if (activeData?.source === 'sidebar' && (over.id === 'canvas-drop' || blocks.some((b) => b.instanceId === over.id))) {
      const template = activeData.template as BlockTemplate;
      addBlock({
        templateId: template.id,
        type: template.type,
        props: { ...template.defaultProps },
      });
      return;
    }

    // Reorder within canvas
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.instanceId === active.id);
      const newIndex = blocks.findIndex((b) => b.instanceId === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderBlocks(oldIndex, newIndex);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-screen overflow-hidden">
        <Topbar />
        <div
          className="flex flex-1 overflow-hidden"
          onClick={() => selectBlock(null)}
        >
          <Sidebar />
          <Canvas />
          <PropertiesPanel />
        </div>
      </div>

      {/* Drag overlay ghost */}
      <DragOverlay>
        {activeDragTemplate && (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl pointer-events-none"
            style={{
              backgroundColor: 'rgba(124,58,237,0.9)',
              border: '1px solid rgba(167,139,250,0.5)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              minWidth: 160,
            }}
          >
            <span className="text-xl">{activeDragTemplate.icon}</span>
            <span className="text-sm font-semibold">{activeDragTemplate.label}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
