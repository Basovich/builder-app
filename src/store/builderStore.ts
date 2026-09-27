import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { CanvasBlock, ViewportType } from '../types';

interface BuilderState {
  blocks: CanvasBlock[];
  selectedBlockId: string | null;
  viewport: ViewportType;

  addBlock: (block: Omit<CanvasBlock, 'instanceId'>) => void;
  removeBlock: (instanceId: string) => void;
  moveBlock: (instanceId: string, direction: 'up' | 'down') => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  updateBlockProps: (instanceId: string, props: Record<string, unknown>) => void;
  selectBlock: (instanceId: string | null) => void;
  setViewport: (viewport: ViewportType) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  blocks: [],
  selectedBlockId: null,
  viewport: 'desktop',

  addBlock: (block) =>
    set((state) => ({
      blocks: [...state.blocks, { ...block, instanceId: uuidv4() }],
    })),

  removeBlock: (instanceId) =>
    set((state) => ({
      blocks: state.blocks.filter((b) => b.instanceId !== instanceId),
      selectedBlockId: state.selectedBlockId === instanceId ? null : state.selectedBlockId,
    })),

  moveBlock: (instanceId, direction) =>
    set((state) => {
      const index = state.blocks.findIndex((b) => b.instanceId === instanceId);
      if (index === -1) return state;
      const newBlocks = [...state.blocks];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newBlocks.length) return state;
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      return { blocks: newBlocks };
    }),

  reorderBlocks: (fromIndex, toIndex) =>
    set((state) => {
      const newBlocks = [...state.blocks];
      const [moved] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, moved);
      return { blocks: newBlocks };
    }),

  updateBlockProps: (instanceId, props) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.instanceId === instanceId ? { ...b, props: { ...b.props, ...props } } : b,
      ),
    })),

  selectBlock: (instanceId) => set({ selectedBlockId: instanceId }),

  setViewport: (viewport) => set({ viewport }),
}));
