export type BlockType =
  | 'header'
  | 'footer'
  | 'hero'
  | 'cta'
  | 'features'
  | 'testimonials'
  | 'gallery'
  | 'slider'
  | 'pricing'
  | 'contact';

export type CategoryType = 'Layout' | 'Sections' | 'Media' | 'Commerce';
export type ViewportType = 'desktop' | 'tablet' | 'mobile';

export interface BlockTemplate {
  id: string;
  type: BlockType;
  category: CategoryType;
  label: string;
  icon: string;
  defaultProps: Record<string, unknown>;
}

export interface CanvasBlock {
  instanceId: string;
  templateId: string;
  type: BlockType;
  props: Record<string, unknown>;
}

export type PropFieldType =
  | { kind: 'text'; label: string; key: string }
  | { kind: 'textarea'; label: string; key: string }
  | { kind: 'color'; label: string; key: string }
  | { kind: 'select'; label: string; key: string; options: { label: string; value: string }[] }
  | { kind: 'image'; label: string; key: string }
  | { kind: 'list'; label: string; key: string; itemSchema: PropFieldType[] };
