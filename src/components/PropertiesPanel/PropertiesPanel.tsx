import { useBuilderStore } from '../../store/builderStore';
import { TextField, TextareaField, ColorField, SelectField } from './fields/Fields';

export function PropertiesPanel() {
  const { blocks, selectedBlockId, updateBlockProps, selectBlock } = useBuilderStore();
  const block = blocks.find((b) => b.instanceId === selectedBlockId);

  if (!block) {
    return (
      <aside
        className="flex flex-col items-center justify-center h-full text-center p-6"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 300,
          minWidth: 300,
          backgroundColor: '#111318',
          borderLeft: '1px solid #1e2130',
        }}
      >
        <div className="text-4xl mb-3">🖱️</div>
        <p className="text-sm font-medium text-slate-400">Select a block</p>
        <p className="text-xs text-slate-600 mt-1">Click on any block in the canvas to edit its properties</p>
      </aside>
    );
  }

  const p = block.props as Record<string, any>;
  const update = (key: string, value: unknown) => updateBlockProps(block.instanceId, { [key]: value });

  const renderFields = () => {
    switch (block.type) {
      case 'header':
        return (
          <>
            <TextField label="Logo Text" value={p.logo} onChange={(v) => update('logo', v)} />
            <ColorField label="Background Color" value={p.bgColor} onChange={(v) => update('bgColor', v)} />
            <ColorField label="Text Color" value={p.textColor} onChange={(v) => update('textColor', v)} />
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nav Items (one per line)</label>
              <textarea
                value={(p.navItems as string[]).join('\n')}
                onChange={(e) => update('navItems', e.target.value.split('\n').filter(Boolean))}
                rows={4}
                className="w-full px-3 py-2 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all resize-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
          </>
        );

      case 'footer':
        return (
          <>
            <TextField label="Logo Text" value={p.logo} onChange={(v) => update('logo', v)} />
            <TextField label="Copyright" value={p.copyright} onChange={(v) => update('copyright', v)} />
            <ColorField label="Background Color" value={p.bgColor} onChange={(v) => update('bgColor', v)} />
            <ColorField label="Text Color" value={p.textColor} onChange={(v) => update('textColor', v)} />
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Footer Links (one per line)</label>
              <textarea
                value={(p.links as string[]).join('\n')}
                onChange={(e) => update('links', e.target.value.split('\n').filter(Boolean))}
                rows={3}
                className="w-full px-3 py-2 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all resize-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
          </>
        );

      case 'hero':
        return (
          <>
            <TextField label="Title" value={p.title} onChange={(v) => update('title', v)} />
            <TextareaField label="Subtitle" value={p.subtitle} onChange={(v) => update('subtitle', v)} />
            <TextField label="Button Text" value={p.btnText} onChange={(v) => update('btnText', v)} />
            <ColorField label="Button Color" value={p.btnColor} onChange={(v) => update('btnColor', v)} />
            <ColorField label="Background Color" value={p.bgColor} onChange={(v) => update('bgColor', v)} />
            <ColorField label="Text Color" value={p.textColor} onChange={(v) => update('textColor', v)} />
            <TextField label="Background Image URL" value={p.bgImage || ''} onChange={(v) => update('bgImage', v)} placeholder="https://..." />
          </>
        );

      case 'cta':
        return (
          <>
            <TextField label="Headline" value={p.headline} onChange={(v) => update('headline', v)} />
            <TextareaField label="Description" value={p.description} onChange={(v) => update('description', v)} />
            <TextField label="Button Text" value={p.btnText} onChange={(v) => update('btnText', v)} />
            <ColorField label="Button Color" value={p.btnColor} onChange={(v) => update('btnColor', v)} />
            <ColorField label="Background Color" value={p.bgColor} onChange={(v) => update('bgColor', v)} />
            <ColorField label="Text Color" value={p.textColor} onChange={(v) => update('textColor', v)} />
          </>
        );

      case 'features':
        return (
          <>
            <TextField label="Section Title" value={p.title} onChange={(v) => update('title', v)} />
            <TextareaField label="Subtitle" value={p.subtitle} onChange={(v) => update('subtitle', v)} />
            <ColorField label="Background Color" value={p.bgColor} onChange={(v) => update('bgColor', v)} />
            <ColorField label="Text Color" value={p.textColor} onChange={(v) => update('textColor', v)} />
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Features</label>
              {(p.features as { icon: string; title: string; description: string }[]).map((f, i) => (
                <div key={i} className="p-3 rounded-lg space-y-2" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={f.icon}
                      onChange={(e) => {
                        const arr = [...(p.features as any[])];
                        arr[i] = { ...arr[i], icon: e.target.value };
                        update('features', arr);
                      }}
                      className="w-12 px-2 py-1 rounded text-sm text-center text-slate-200 focus:outline-none"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                    <input
                      type="text"
                      value={f.title}
                      onChange={(e) => {
                        const arr = [...(p.features as any[])];
                        arr[i] = { ...arr[i], title: e.target.value };
                        update('features', arr);
                      }}
                      className="flex-1 px-2 py-1 rounded text-sm text-slate-200 focus:outline-none"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                      placeholder="Title"
                    />
                  </div>
                  <input
                    type="text"
                    value={f.description}
                    onChange={(e) => {
                      const arr = [...(p.features as any[])];
                      arr[i] = { ...arr[i], description: e.target.value };
                      update('features', arr);
                    }}
                    className="w-full px-2 py-1 rounded text-xs text-slate-400 focus:outline-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>
          </>
        );

      case 'testimonials':
        return (
          <>
            <TextField label="Section Title" value={p.title} onChange={(v) => update('title', v)} />
            <ColorField label="Background Color" value={p.bgColor} onChange={(v) => update('bgColor', v)} />
            <ColorField label="Text Color" value={p.textColor} onChange={(v) => update('textColor', v)} />
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Testimonials</label>
              {(p.items as { name: string; role: string; quote: string }[]).map((item, i) => (
                <div key={i} className="p-3 rounded-lg space-y-2" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <input type="text" value={item.name} placeholder="Name"
                    onChange={(e) => { const arr = [...(p.items as any[])]; arr[i] = { ...arr[i], name: e.target.value }; update('items', arr); }}
                    className="w-full px-2 py-1 rounded text-sm text-slate-200 focus:outline-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <input type="text" value={item.role} placeholder="Role"
                    onChange={(e) => { const arr = [...(p.items as any[])]; arr[i] = { ...arr[i], role: e.target.value }; update('items', arr); }}
                    className="w-full px-2 py-1 rounded text-xs text-slate-400 focus:outline-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                  />
                  <textarea value={item.quote} placeholder="Quote" rows={2}
                    onChange={(e) => { const arr = [...(p.items as any[])]; arr[i] = { ...arr[i], quote: e.target.value }; update('items', arr); }}
                    className="w-full px-2 py-1 rounded text-xs text-slate-400 focus:outline-none resize-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                  />
                </div>
              ))}
            </div>
          </>
        );

      case 'pricing':
        return (
          <>
            <TextField label="Title" value={p.title} onChange={(v) => update('title', v)} />
            <TextareaField label="Subtitle" value={p.subtitle} onChange={(v) => update('subtitle', v)} />
            <ColorField label="Accent Color" value={p.accentColor} onChange={(v) => update('accentColor', v)} />
            <ColorField label="Background Color" value={p.bgColor} onChange={(v) => update('bgColor', v)} />
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Plans</label>
              {(p.plans as { name: string; price: string; period: string }[]).map((plan, i) => (
                <div key={i} className="p-3 rounded-lg space-y-2" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex gap-2">
                    <input type="text" value={plan.name} placeholder="Plan name"
                      onChange={(e) => { const arr = [...(p.plans as any[])]; arr[i] = { ...arr[i], name: e.target.value }; update('plans', arr); }}
                      className="flex-1 px-2 py-1 rounded text-sm text-slate-200 focus:outline-none"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                    <input type="text" value={plan.price} placeholder="$0"
                      onChange={(e) => { const arr = [...(p.plans as any[])]; arr[i] = { ...arr[i], price: e.target.value }; update('plans', arr); }}
                      className="w-16 px-2 py-1 rounded text-sm text-slate-200 focus:outline-none"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 'contact':
        return (
          <>
            <TextField label="Title" value={p.title} onChange={(v) => update('title', v)} />
            <TextareaField label="Subtitle" value={p.subtitle} onChange={(v) => update('subtitle', v)} />
            <TextField label="Button Text" value={p.btnText} onChange={(v) => update('btnText', v)} />
            <ColorField label="Button Color" value={p.btnColor} onChange={(v) => update('btnColor', v)} />
            <ColorField label="Background Color" value={p.bgColor} onChange={(v) => update('bgColor', v)} />
            <ColorField label="Text Color" value={p.textColor} onChange={(v) => update('textColor', v)} />
          </>
        );

      case 'gallery':
        return (
          <>
            <TextField label="Section Title" value={p.title} onChange={(v) => update('title', v)} />
            <SelectField
              label="Columns"
              value={String(p.columns)}
              options={[{ label: '2 Columns', value: '2' }, { label: '3 Columns', value: '3' }, { label: '4 Columns', value: '4' }]}
              onChange={(v) => update('columns', v)}
            />
            <ColorField label="Background Color" value={p.bgColor} onChange={(v) => update('bgColor', v)} />
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Image URLs (one per line)</label>
              <textarea
                value={(p.images as string[]).join('\n')}
                onChange={(e) => update('images', e.target.value.split('\n').filter(Boolean))}
                rows={6}
                className="w-full px-3 py-2 rounded-lg text-xs text-slate-300 font-mono focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all resize-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
          </>
        );

      case 'slider':
        return (
          <>
            <ColorField label="Background Color" value={p.bgColor} onChange={(v) => update('bgColor', v)} />
            <ColorField label="Text Color" value={p.textColor} onChange={(v) => update('textColor', v)} />
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Slides</label>
              {(p.slides as { title: string; description: string; image: string }[]).map((slide, i) => (
                <div key={i} className="p-3 rounded-lg space-y-2" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-xs text-slate-500">Slide {i + 1}</span>
                  <input type="text" value={slide.title} placeholder="Title"
                    onChange={(e) => { const arr = [...(p.slides as any[])]; arr[i] = { ...arr[i], title: e.target.value }; update('slides', arr); }}
                    className="w-full px-2 py-1 rounded text-sm text-slate-200 focus:outline-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <input type="text" value={slide.image} placeholder="Image URL"
                    onChange={(e) => { const arr = [...(p.slides as any[])]; arr[i] = { ...arr[i], image: e.target.value }; update('slides', arr); }}
                    className="w-full px-2 py-1 rounded text-xs text-slate-400 font-mono focus:outline-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                  />
                  <input type="text" value={slide.description} placeholder="Description"
                    onChange={(e) => { const arr = [...(p.slides as any[])]; arr[i] = { ...arr[i], description: e.target.value }; update('slides', arr); }}
                    className="w-full px-2 py-1 rounded text-xs text-slate-400 focus:outline-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                  />
                </div>
              ))}
            </div>
          </>
        );

      default:
        return <p className="text-sm text-slate-500">No editable properties for this block.</p>;
    }
  };

  return (
    <aside
      className="flex flex-col h-full overflow-hidden"
      onClick={(e) => e.stopPropagation()}
      style={{
        width: 300,
        minWidth: 300,
        backgroundColor: '#111318',
        borderLeft: '1px solid #1e2130',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-4 shrink-0"
        style={{ borderBottom: '1px solid #1e2130' }}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Properties</p>
          <p className="text-sm font-semibold text-slate-200 mt-0.5 capitalize">{block.type}</p>
        </div>
        <button
          onClick={() => selectBlock(null)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all text-sm"
        >
          ✕
        </button>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {renderFields()}
      </div>
    </aside>
  );
}
