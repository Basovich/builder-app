import { useState, useRef } from 'react';
import type { CanvasBlock } from '../../types';

interface Props {
  block: CanvasBlock;
}

type Slide = { title: string; description: string; image: string };

function SliderBlock({ p }: { p: Record<string, any> }) {
  const slides: Slide[] = Array.isArray(p.slides) ? p.slides : [];
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    touchStartX.current = null;
  };

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <section
      style={{ backgroundColor: p.bgColor, color: p.textColor }}
      className="w-full relative overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide */}
      <div className="relative min-h-[260px] @sm:min-h-[360px] @md:min-h-[440px] flex items-end">
        {slide.image && (
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          />
        )}
        <div className="relative z-10 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pb-10 @sm:p-8 @sm:pb-12 @md:p-10 @md:pb-10">
          <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold text-white mb-2">{slide.title}</h2>
          <p className="text-white/80 text-sm @sm:text-base @md:text-lg max-w-xl">{slide.description}</p>
        </div>

        {/* Arrow buttons */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_: Slide, si: number) => (
              <button
                key={si}
                onClick={() => setCurrent(si)}
                aria-label={`Slide ${si + 1}`}
                className="w-2.5 h-2.5 @sm:w-3 @sm:h-3 rounded-full border-2 border-white transition-colors"
                style={{ backgroundColor: si === current ? 'white' : 'transparent' }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function HeaderBlock({ p }: { p: Record<string, any> }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = Array.isArray(p.navItems) ? p.navItems : [];

  return (
    <header
      style={{ backgroundColor: p.bgColor || '#ffffff', color: p.textColor || '#1e293b' }}
      className="w-full px-4 @md:px-8 py-4 shadow-sm relative"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-xl font-bold tracking-tight shrink-0">{p.logo || 'Logo'}</span>

        {/* Desktop Nav */}
        <nav className="hidden @md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item: string, i: number) => (
            <a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:opacity-75 transition-opacity"
              style={{ color: p.textColor }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className="flex @md:hidden items-center justify-center w-9 h-9 rounded-lg border border-black/10 hover:bg-black/5 transition-colors text-lg shrink-0 cursor-pointer select-none"
          style={{ color: p.textColor }}
          aria-label="Toggle Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <nav className="flex @md:hidden flex-col gap-1 pt-3 pb-1 border-t border-black/10 mt-3 text-sm font-medium">
          {navItems.map((item: string, i: number) => (
            <a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="px-3 py-2 rounded-lg hover:bg-black/5 transition-colors"
              style={{ color: p.textColor }}
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function FooterBlock({ p }: { p: Record<string, any> }) {
  const links = Array.isArray(p.links) ? p.links : [];

  return (
    <footer style={{ backgroundColor: p.bgColor || '#1e293b', color: p.textColor || '#f1f5f9' }} className="w-full px-4 @md:px-8 py-8 @md:py-10">
      <div className="max-w-6xl mx-auto flex flex-col @md:flex-row items-center justify-between gap-6 text-center @md:text-left">
        <span className="text-lg font-bold shrink-0">{p.logo || 'Logo'}</span>
        <div className="flex flex-wrap justify-center gap-4 @md:gap-6 text-sm font-medium">
          {links.map((link: string, i: number) => (
            <a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:opacity-75 transition-opacity"
              style={{ color: p.textColor }}
            >
              {link}
            </a>
          ))}
        </div>
        <p className="text-xs @md:text-sm opacity-60">{p.copyright || ''}</p>
      </div>
    </footer>
  );
}

export function BlockRenderer({ block }: Props) {
  const p = block.props as Record<string, any>;

  switch (block.type) {
    case 'header':
      return <HeaderBlock p={p} />;

    case 'footer':
      return <FooterBlock p={p} />;

    case 'hero':
      return (
        <section
          style={{
            backgroundColor: p.bgColor,
            color: p.textColor,
            backgroundImage: p.bgImage ? `url(${p.bgImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="w-full py-12 @sm:py-20 @md:py-24 px-4 @sm:px-8 text-center relative"
        >
          {p.bgImage && <div className="absolute inset-0 bg-black/50" />}
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-extrabold leading-tight mb-4 @sm:mb-6">{p.title}</h1>
            <p className="text-base @sm:text-lg @md:text-xl opacity-80 mb-6 @sm:mb-10 max-w-2xl mx-auto">{p.subtitle}</p>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-block px-6 @sm:px-8 py-3.5 @sm:py-4 rounded-xl font-semibold text-white text-base @sm:text-lg shadow-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: p.btnColor }}
            >
              {p.btnText}
            </a>
          </div>
        </section>
      );

    case 'cta':
      return (
        <section style={{ backgroundColor: p.bgColor, color: p.textColor }} className="w-full py-12 @sm:py-16 @md:py-20 px-4 @sm:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-4">{p.headline}</h2>
            <p className="text-base @sm:text-lg opacity-80 mb-6 @sm:mb-8">{p.description}</p>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-block px-6 @sm:px-8 py-3.5 @sm:py-4 rounded-xl font-semibold text-base @sm:text-lg shadow-lg hover:opacity-90 transition-all border-2 border-white/30"
              style={{ backgroundColor: p.btnColor, color: p.textColor === '#ffffff' ? '#ffffff' : p.textColor }}
            >
              {p.btnText}
            </a>
          </div>
        </section>
      );

    case 'features': {
      const features = Array.isArray(p.features) ? p.features : [];
      return (
        <section style={{ backgroundColor: p.bgColor, color: p.textColor }} className="w-full py-12 @sm:py-16 @md:py-20 px-4 @sm:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 @sm:mb-14">
              <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">{p.title}</h2>
              <p className="text-base @sm:text-lg opacity-70">{p.subtitle}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {features.map((f: { icon: string; title: string; description: string }, i: number) => (
                <div key={i} className="p-5 @sm:p-6 rounded-2xl border border-black/10 hover:shadow-lg transition-shadow bg-white/5">
                  <div className="text-3xl @sm:text-4xl mb-3 @sm:mb-4">{f.icon}</div>
                  <h3 className="text-lg @sm:text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="opacity-70 text-xs @sm:text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'testimonials': {
      const items = Array.isArray(p.items) ? p.items : [];
      return (
        <section style={{ backgroundColor: p.bgColor, color: p.textColor }} className="w-full py-12 @sm:py-16 @md:py-20 px-4 @sm:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold text-center mb-8 @sm:mb-14">{p.title}</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {items.map((item: { name: string; role: string; quote: string; avatar: string }, i: number) => (
                <div key={i} className="p-6 @sm:p-8 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow bg-white/5 flex flex-col justify-between">
                  <p className="text-base @sm:text-lg italic opacity-80 mb-6">"{item.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 @sm:w-10 @sm:h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold text-xs @sm:text-sm shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-xs @sm:text-sm">{item.name}</p>
                      <p className="text-xs opacity-60">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'pricing': {
      const plans = Array.isArray(p.plans) ? p.plans : [];
      return (
        <section style={{ backgroundColor: p.bgColor, color: p.textColor }} className="w-full py-12 @sm:py-16 @md:py-20 px-4 @sm:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 @sm:mb-14">
              <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">{p.title}</h2>
              <p className="text-base @sm:text-lg opacity-70">{p.subtitle}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '1.5rem',
                alignItems: 'stretch',
              }}
            >
              {plans.map((plan: { name: string; price: string; period: string; features: string[]; highlighted: boolean }, i: number) => (
                <div
                  key={i}
                  className="p-6 @sm:p-8 rounded-2xl border-2 transition-all relative flex flex-col justify-between"
                  style={{
                    borderColor: plan.highlighted ? p.accentColor : 'rgba(0,0,0,0.1)',
                    backgroundColor: plan.highlighted ? p.accentColor : 'transparent',
                    color: plan.highlighted ? '#ffffff' : p.textColor,
                  }}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg @sm:text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl @sm:text-4xl font-extrabold">{plan.price}</span>
                      <span className="opacity-60 text-xs @sm:text-sm">{plan.period}</span>
                    </div>
                    <ul className="space-y-2.5 mb-8 text-xs @sm:text-sm">
                      {Array.isArray(plan.features) && plan.features.map((f: string, fi: number) => (
                        <li key={fi} className="flex items-center gap-2">
                          <span className="shrink-0">✓</span> <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="w-full py-3 rounded-xl font-semibold text-xs @sm:text-sm transition-all"
                    style={{
                      backgroundColor: plan.highlighted ? '#ffffff' : p.accentColor,
                      color: plan.highlighted ? p.accentColor : '#ffffff',
                    }}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'contact': {
      const fields = Array.isArray(p.fields) ? p.fields : [];
      return (
        <section style={{ backgroundColor: p.bgColor, color: p.textColor }} className="w-full py-12 @sm:py-16 @md:py-20 px-4 @sm:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 @sm:mb-12">
              <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">{p.title}</h2>
              <p className="text-base @sm:text-lg opacity-70">{p.subtitle}</p>
            </div>
            <div className="space-y-4">
              {fields.map((field: string, i: number) => (
                field === 'Message' ? (
                  <textarea
                    key={i}
                    placeholder={field}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-black/20 bg-black/5 text-sm focus:outline-none focus:ring-2 resize-none"
                    style={{ color: p.textColor }}
                    readOnly
                  />
                ) : (
                  <input
                    key={i}
                    type={field === 'Email' ? 'email' : 'text'}
                    placeholder={field}
                    className="w-full px-4 py-3 rounded-xl border border-black/20 bg-black/5 text-sm focus:outline-none focus:ring-2"
                    style={{ color: p.textColor }}
                    readOnly
                  />
                )
              ))}
              <button
                type="button"
                className="w-full py-3.5 @sm:py-4 rounded-xl font-semibold text-white text-sm @sm:text-base hover:opacity-90 transition-all"
                style={{ backgroundColor: p.btnColor }}
              >
                {p.btnText}
              </button>
            </div>
          </div>
        </section>
      );
    }

    case 'gallery': {
      const images = Array.isArray(p.images) ? p.images : [];
      return (
        <section style={{ backgroundColor: p.bgColor, color: p.textColor }} className="w-full py-12 @sm:py-16 @md:py-20 px-4 @sm:px-8">
          <div className="max-w-6xl mx-auto">
            {p.title && <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold text-center mb-8 @sm:mb-12">{p.title}</h2>}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
              }}
            >
              {images.map((src: string, i: number) => (
                <div key={i} className="overflow-hidden rounded-xl aspect-square">
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'slider': {
      return <SliderBlock p={p} />;
    }

    default:
      return (
        <div className="w-full p-8 text-center text-gray-400 border border-dashed border-gray-600">
          Unknown block: {block.type}
        </div>
      );
  }
}



