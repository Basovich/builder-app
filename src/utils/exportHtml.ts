import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { CanvasBlock } from '../types';

function renderBlockHtml(block: CanvasBlock): string {
  const p = block.props as Record<string, any>;

  switch (block.type) {
    case 'header':
      return `
  <header style="background-color:${p.bgColor};color:${p.textColor};padding:1rem 1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;box-shadow:0 1px 4px rgba(0,0,0,0.1);">
    <span style="font-size:1.25rem;font-weight:700;">${p.logo}</span>
    <nav style="display:flex;flex-wrap:wrap;gap:1.25rem;">
      ${(p.navItems as string[]).map((item) => `<a href="#" style="color:${p.textColor};text-decoration:none;font-size:0.9rem;font-weight:500;">${item}</a>`).join('')}
    </nav>
  </header>`;

    case 'footer':
      return `
  <footer style="background-color:${p.bgColor};color:${p.textColor};padding:2.5rem 1.5rem;">
    <div style="max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1.5rem;text-align:center;">
      <span style="font-size:1.1rem;font-weight:700;">${p.logo}</span>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1.25rem;">
        ${(p.links as string[]).map((link) => `<a href="#" style="color:${p.textColor};text-decoration:none;font-size:0.85rem;opacity:0.8;">${link}</a>`).join('')}
      </div>
      <p style="font-size:0.85rem;opacity:0.6;margin:0;">${p.copyright}</p>
    </div>
  </footer>`;

    case 'hero':
      return `
  <section style="background-color:${p.bgColor};color:${p.textColor};padding:4rem 1.5rem;text-align:center;${p.bgImage ? `background-image:url('${p.bgImage}');background-size:cover;background-position:center;position:relative;` : ''}">
    ${p.bgImage ? `<div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);"></div>` : ''}
    <div style="position:relative;z-index:1;max-width:800px;margin:0 auto;">
      <h1 style="font-size:clamp(2rem, 5vw, 3.5rem);font-weight:800;margin-bottom:1.25rem;line-height:1.15;">${p.title}</h1>
      <p style="font-size:clamp(1rem, 2.5vw, 1.25rem);opacity:0.8;margin-bottom:2rem;">${p.subtitle}</p>
      <a href="#" style="display:inline-block;padding:0.875rem 2rem;background-color:${p.btnColor};color:#fff;text-decoration:none;border-radius:0.75rem;font-weight:600;font-size:1.05rem;">${p.btnText}</a>
    </div>
  </section>`;

    case 'cta':
      return `
  <section style="background-color:${p.bgColor};color:${p.textColor};padding:4rem 1.5rem;text-align:center;">
    <div style="max-width:640px;margin:0 auto;">
      <h2 style="font-size:clamp(1.75rem, 4vw, 2.5rem);font-weight:700;margin-bottom:1rem;">${p.headline}</h2>
      <p style="font-size:clamp(0.95rem, 2vw, 1.1rem);opacity:0.85;margin-bottom:1.75rem;">${p.description}</p>
      <a href="#" style="display:inline-block;padding:0.875rem 2rem;background-color:${p.btnColor};color:#fff;text-decoration:none;border-radius:0.75rem;font-weight:600;font-size:1rem;border:2px solid rgba(255,255,255,0.3);">${p.btnText}</a>
    </div>
  </section>`;

    case 'features':
      return `
  <section style="background-color:${p.bgColor};color:${p.textColor};padding:4rem 1.5rem;">
    <div style="max-width:1200px;margin:0 auto;">
      <div style="text-align:center;margin-bottom:3rem;">
        <h2 style="font-size:clamp(1.75rem, 4vw, 2.5rem);font-weight:700;margin-bottom:0.75rem;">${p.title}</h2>
        <p style="font-size:clamp(0.95rem, 2vw, 1.1rem);opacity:0.7;">${p.subtitle}</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;">
        ${(p.features as { icon: string; title: string; description: string }[]).map((f) => `
        <div style="padding:1.5rem;border-radius:1rem;border:1px solid rgba(0,0,0,0.1);background:rgba(255,255,255,0.03);">
          <div style="font-size:2.25rem;margin-bottom:0.75rem;">${f.icon}</div>
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.5rem;">${f.title}</h3>
          <p style="font-size:0.875rem;opacity:0.7;line-height:1.6;margin:0;">${f.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

    case 'testimonials':
      return `
  <section style="background-color:${p.bgColor};color:${p.textColor};padding:4rem 1.5rem;">
    <div style="max-width:1200px;margin:0 auto;">
      <h2 style="font-size:clamp(1.75rem, 4vw, 2.5rem);font-weight:700;text-align:center;margin-bottom:3rem;">${p.title}</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;">
        ${(p.items as { name: string; role: string; quote: string }[]).map((item) => `
        <div style="padding:1.75rem;border-radius:1rem;border:1px solid rgba(0,0,0,0.1);background:rgba(255,255,255,0.03);display:flex;flex-direction:column;justify-content:space-between;">
          <p style="font-size:1rem;font-style:italic;opacity:0.8;margin-bottom:1.25rem;">"${item.quote}"</p>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a855f7);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:0.85rem;flex-shrink:0;">${item.name.charAt(0)}</div>
            <div>
              <p style="font-weight:600;font-size:0.875rem;margin:0;">${item.name}</p>
              <p style="font-size:0.75rem;opacity:0.6;margin:0;">${item.role}</p>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

    case 'pricing':
      return `
  <section style="background-color:${p.bgColor};color:${p.textColor};padding:4rem 1.5rem;">
    <div style="max-width:1200px;margin:0 auto;">
      <div style="text-align:center;margin-bottom:3rem;">
        <h2 style="font-size:clamp(1.75rem, 4vw, 2.5rem);font-weight:700;margin-bottom:0.75rem;">${p.title}</h2>
        <p style="font-size:clamp(0.95rem, 2vw, 1.1rem);opacity:0.7;">${p.subtitle}</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1.5rem;align-items:stretch;">
        ${(p.plans as { name: string; price: string; period: string; features: string[]; highlighted: boolean }[]).map((plan) => `
        <div style="padding:1.75rem;border-radius:1rem;border:2px solid ${plan.highlighted ? p.accentColor : 'rgba(0,0,0,0.1)'};background-color:${plan.highlighted ? p.accentColor : 'transparent'};color:${plan.highlighted ? '#fff' : p.textColor};position:relative;display:flex;flex-direction:column;justify-content:space-between;">
          ${plan.highlighted ? `<div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#facc15;color:#713f12;font-size:0.75rem;font-weight:700;padding:2px 12px;border-radius:999px;white-space:nowrap;">Most Popular</div>` : ''}
          <div>
            <h3 style="font-size:1.15rem;font-weight:700;margin-bottom:0.5rem;">${plan.name}</h3>
            <div style="display:flex;align-items:baseline;gap:4px;margin-bottom:1.25rem;">
              <span style="font-size:2.25rem;font-weight:800;">${plan.price}</span>
              <span style="opacity:0.6;font-size:0.85rem;">${plan.period}</span>
            </div>
            <ul style="list-style:none;padding:0;margin:0 0 1.5rem;display:flex;flex-direction:column;gap:0.5rem;font-size:0.875rem;">
              ${plan.features.map((f) => `<li style="display:flex;align-items:center;gap:0.5rem;"><span>✓</span> <span>${f}</span></li>`).join('')}
            </ul>
          </div>
          <a href="#" style="display:block;text-align:center;padding:0.75rem;border-radius:0.75rem;text-decoration:none;font-weight:600;font-size:0.875rem;background-color:${plan.highlighted ? '#fff' : p.accentColor};color:${plan.highlighted ? p.accentColor : '#fff'};">Get Started</a>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

    case 'contact':
      return `
  <section style="background-color:${p.bgColor};color:${p.textColor};padding:4rem 1.5rem;">
    <div style="max-width:640px;margin:0 auto;">
      <div style="text-align:center;margin-bottom:2.5rem;">
        <h2 style="font-size:clamp(1.75rem, 4vw, 2.5rem);font-weight:700;margin-bottom:0.75rem;">${p.title}</h2>
        <p style="font-size:clamp(0.95rem, 2vw, 1.1rem);opacity:0.7;">${p.subtitle}</p>
      </div>
      <form style="display:flex;flex-direction:column;gap:1rem;">
        ${(p.fields as string[]).map((field) =>
          field === 'Message'
            ? `<textarea name="${field.toLowerCase()}" placeholder="${field}" rows="4" style="width:100%;padding:0.75rem 1rem;border-radius:0.75rem;border:1px solid rgba(0,0,0,0.15);font-size:0.9rem;font-family:inherit;resize:vertical;"></textarea>`
            : `<input type="${field === 'Email' ? 'email' : 'text'}" name="${field.toLowerCase()}" placeholder="${field}" style="width:100%;padding:0.75rem 1rem;border-radius:0.75rem;border:1px solid rgba(0,0,0,0.15);font-size:0.9rem;font-family:inherit;">`
        ).join('')}
        <button type="submit" style="padding:0.875rem;border-radius:0.75rem;background-color:${p.btnColor};color:#fff;border:none;font-size:0.95rem;font-weight:600;cursor:pointer;">${p.btnText}</button>
      </form>
    </div>
  </section>`;

    case 'gallery':
      return `
  <section style="background-color:${p.bgColor};color:${p.textColor};padding:4rem 1.5rem;">
    <div style="max-width:1200px;margin:0 auto;">
      ${p.title ? `<h2 style="font-size:clamp(1.75rem, 4vw, 2.5rem);font-weight:700;text-align:center;margin-bottom:2.5rem;">${p.title}</h2>` : ''}
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem;">
        ${(p.images as string[]).map((src) => `<div style="border-radius:0.75rem;overflow:hidden;aspect-ratio:1;"><img src="${src}" alt="Gallery" style="width:100%;height:100%;object-fit:cover;"></div>`).join('')}
      </div>
    </div>
  </section>`;

    case 'slider': {
      const slides = (p.slides as { title: string; description: string; image: string }[]) || [];
      if (slides.length === 0) return '';
      const uid = `sl_${Math.random().toString(36).slice(2, 8)}`;
      const slidesHtml = slides.map((slide, i) => `
    <div class="${uid}-slide" style="position:absolute;inset:0;opacity:${i === 0 ? '1' : '0'};transition:opacity 0.5s ease;pointer-events:${i === 0 ? 'auto' : 'none'};">
      ${slide.image ? `<img src="${slide.image}" alt="${slide.title}" style="width:100%;height:100%;object-fit:cover;">` : ''}
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.8),transparent);display:flex;flex-direction:column;justify-content:flex-end;padding:2rem 1.5rem;">
        <h2 style="font-size:clamp(1.5rem,4vw,2.5rem);font-weight:700;color:#fff;margin:0 0 0.5rem;">${slide.title}</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:clamp(0.875rem,2vw,1.1rem);margin:0;">${slide.description}</p>
      </div>
    </div>`).join('');

      const dotsHtml = slides.length > 1 ? `
    <div id="${uid}-dots" style="position:absolute;bottom:1rem;left:50%;transform:translateX(-50%);display:flex;gap:0.5rem;z-index:20;">
      ${slides.map((_, i) => `<button onclick="window['${uid}'](${i})" aria-label="Slide ${i + 1}" style="width:10px;height:10px;border-radius:50%;border:2px solid #fff;background:${i === 0 ? '#fff' : 'transparent'};cursor:pointer;padding:0;transition:background 0.3s;"></button>`).join('')}
    </div>` : '';

      const arrowsHtml = slides.length > 1 ? `
    <button onclick="window['${uid}_prev']()" aria-label="Previous slide" style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);z-index:20;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,0.45);border:none;cursor:pointer;color:#fff;display:flex;align-items:center;justify-content:center;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
    </button>
    <button onclick="window['${uid}_next']()" aria-label="Next slide" style="position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);z-index:20;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,0.45);border:none;cursor:pointer;color:#fff;display:flex;align-items:center;justify-content:center;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </button>` : '';

      return `
  <section style="background-color:${p.bgColor};position:relative;overflow:hidden;" id="${uid}-section">
    <div style="position:relative;min-height:360px;" id="${uid}-track">
      ${slidesHtml}
      ${dotsHtml}
      ${arrowsHtml}
    </div>
  </section>
  <script>
  (function(){
    var total=${slides.length},cur=0;
    var slides=document.querySelectorAll('.${uid}-slide');
    var dots=document.querySelectorAll('#${uid}-dots button');
    function go(n){
      slides[cur].style.opacity='0';slides[cur].style.pointerEvents='none';
      if(dots.length)dots[cur].style.background='transparent';
      cur=(n+total)%total;
      slides[cur].style.opacity='1';slides[cur].style.pointerEvents='auto';
      if(dots.length)dots[cur].style.background='#fff';
    }
    window['${uid}']=go;
    window['${uid}_prev']=function(){go(cur-1);};
    window['${uid}_next']=function(){go(cur+1);};
    // Touch swipe
    var tx=null;
    var el=document.getElementById('${uid}-track');
    el.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;},{passive:true});
    el.addEventListener('touchend',function(e){
      if(tx===null)return;
      var d=tx-e.changedTouches[0].clientX;
      if(d>50)go(cur+1);else if(d<-50)go(cur-1);
      tx=null;
    },{passive:true});
  })();
  </script>`;
    }
    default:
      return '';
  }
}

export async function exportSite(blocks: CanvasBlock[], projectName = 'My Landing Page') {
  const blocksHtml = blocks.map(renderBlockHtml).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    img { max-width: 100%; display: block; }
    a { text-decoration: none; }
    input, textarea, button { font-family: inherit; box-sizing: border-box; }
    h1, h2, h3, p { margin: 0; }
  </style>
</head>
<body>
${blocksHtml}
</body>
</html>`;

  const zip = new JSZip();
  zip.file('index.html', html);

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${projectName.toLowerCase().replace(/\s+/g, '-')}.zip`);
}

