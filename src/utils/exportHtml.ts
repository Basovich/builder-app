import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { CanvasBlock } from '../types';

function renderBlockHtml(block: CanvasBlock): string {
  const p = block.props as Record<string, any>;

  switch (block.type) {
    case 'header': {
      const uid = `hdr_${Math.random().toString(36).slice(2, 8)}`;
      const navItems = Array.isArray(p.navItems) ? p.navItems : [];
      return `
  <header class="w-full px-6 py-4 shadow-sm relative" style="background-color:${p.bgColor};color:${p.textColor};">
    <div class="max-w-6xl mx-auto flex items-center justify-between gap-4">
      <span class="text-xl font-bold tracking-tight shrink-0">${p.logo}</span>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
        ${navItems.map((item: string) => `<a href="#" class="hover:opacity-80 transition-opacity" style="color:${p.textColor};">${item}</a>`).join('')}
      </nav>

      <!-- Mobile Burger Button -->
      <button type="button" onclick="var el=document.getElementById('${uid}-mobile-nav');el.classList.toggle('hidden');el.classList.toggle('flex');" class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-current/20 hover:bg-black/5 transition-colors text-lg shrink-0 cursor-pointer" aria-label="Toggle Menu">
        ☰
      </button>
    </div>

    <!-- Mobile Nav Dropdown -->
    <nav id="${uid}-mobile-nav" class="hidden md:hidden flex-col gap-1 pt-3 pb-1 border-t border-current/10 mt-3 text-sm font-medium">
      ${navItems.map((item: string) => `<a href="#" class="px-3 py-2 rounded-lg hover:bg-black/5 transition-colors block" style="color:${p.textColor};">${item}</a>`).join('')}
    </nav>
  </header>`;
    }

    case 'footer':
      return `
  <footer class="px-6 py-10" style="background-color:${p.bgColor};color:${p.textColor};">
    <div class="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6 text-center md:text-left">
      <span class="text-lg font-bold tracking-tight">${p.logo}</span>
      <div class="flex flex-wrap justify-center gap-5">
        ${(p.links as string[]).map((link) => `<a href="#" class="text-xs opacity-80 hover:opacity-100 transition-opacity" style="color:${p.textColor};">${link}</a>`).join('')}
      </div>
      <p class="text-xs opacity-60 m-0">${p.copyright}</p>
    </div>
  </footer>`;

    case 'hero':
      return `
  <section class="relative px-6 py-20 text-center overflow-hidden" style="background-color:${p.bgColor};color:${p.textColor};${p.bgImage ? `background-image:url('${p.bgImage}');background-size:cover;background-position:center;` : ''}">
    ${p.bgImage ? `<div class="absolute inset-0 bg-black/50"></div>` : ''}
    <div class="relative z-10 max-w-3xl mx-auto">
      <h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight">${p.title}</h1>
      <p class="text-lg md:text-xl opacity-80 mb-8 max-w-2xl mx-auto leading-relaxed">${p.subtitle}</p>
      <a href="#" class="inline-block px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95" style="background-color:${p.btnColor};">${p.btnText}</a>
    </div>
  </section>`;

    case 'cta':
      return `
  <section class="px-6 py-16 text-center" style="background-color:${p.bgColor};color:${p.textColor};">
    <div class="max-w-xl mx-auto">
      <h2 class="text-2xl md:text-4xl font-bold mb-4 tracking-tight">${p.headline}</h2>
      <p class="text-base md:text-lg opacity-85 mb-8 leading-relaxed">${p.description}</p>
      <a href="#" class="inline-block px-8 py-3.5 rounded-xl font-semibold text-white border-2 border-white/30 shadow-md transition-transform hover:scale-105 active:scale-95" style="background-color:${p.btnColor};">${p.btnText}</a>
    </div>
  </section>`;

    case 'features':
      return `
  <section class="px-6 py-16" style="background-color:${p.bgColor};color:${p.textColor};">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-4xl font-bold mb-3 tracking-tight">${p.title}</h2>
        <p class="text-base md:text-lg opacity-70 max-w-xl mx-auto">${p.subtitle}</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${(p.features as { icon: string; title: string; description: string }[]).map((f) => `
        <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/5 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <div class="text-4xl mb-3">${f.icon}</div>
          <h3 class="text-lg font-semibold mb-2">${f.title}</h3>
          <p class="text-sm opacity-70 leading-relaxed m-0">${f.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

    case 'testimonials':
      return `
  <section class="px-6 py-16" style="background-color:${p.bgColor};color:${p.textColor};">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl md:text-4xl font-bold text-center mb-12 tracking-tight">${p.title}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${(p.items as { name: string; role: string; quote: string }[]).map((item) => `
        <div class="p-7 rounded-2xl border border-black/10 dark:border-white/10 bg-white/5 flex flex-col justify-between shadow-sm">
          <p class="text-base italic opacity-85 mb-6 leading-relaxed">"${item.quote}"</p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-inner">${item.name.charAt(0)}</div>
            <div>
              <p class="font-semibold text-sm m-0">${item.name}</p>
              <p class="text-xs opacity-60 m-0">${item.role}</p>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

    case 'pricing':
      return `
  <section class="px-6 py-16" style="background-color:${p.bgColor};color:${p.textColor};">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-4xl font-bold mb-3 tracking-tight">${p.title}</h2>
        <p class="text-base md:text-lg opacity-70 max-w-xl mx-auto">${p.subtitle}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        ${(p.plans as { name: string; price: string; period: string; features: string[]; highlighted: boolean }[]).map((plan) => `
        <div class="relative p-7 rounded-2xl border-2 flex flex-col justify-between shadow-sm transition-all" style="border-color:${plan.highlighted ? p.accentColor : 'rgba(0,0,0,0.1)'};background-color:${plan.highlighted ? p.accentColor : 'transparent'};color:${plan.highlighted ? '#ffffff' : p.textColor};">
          ${plan.highlighted ? `<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-300 text-amber-950 text-xs font-bold px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap">Most Popular</div>` : ''}
          <div>
            <h3 class="text-lg font-bold mb-2">${plan.name}</h3>
            <div class="flex items-baseline gap-1 mb-5">
              <span class="text-4xl font-extrabold tracking-tight">${plan.price}</span>
              <span class="text-sm opacity-65">${plan.period}</span>
            </div>
            <ul class="space-y-2 mb-6 text-sm list-none p-0">
              ${plan.features.map((f) => `<li class="flex items-center gap-2"><span>✓</span> <span>${f}</span></li>`).join('')}
            </ul>
          </div>
          <a href="#" class="block text-center py-3 px-4 rounded-xl font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-95 shadow-sm" style="background-color:${plan.highlighted ? '#ffffff' : p.accentColor};color:${plan.highlighted ? p.accentColor : '#ffffff'};">Get Started</a>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

    case 'contact':
      return `
  <section class="px-6 py-16" style="background-color:${p.bgColor};color:${p.textColor};">
    <div class="max-w-xl mx-auto">
      <div class="text-center mb-10">
        <h2 class="text-2xl md:text-4xl font-bold mb-3 tracking-tight">${p.title}</h2>
        <p class="text-base md:text-lg opacity-70">${p.subtitle}</p>
      </div>
      <form class="flex flex-col gap-4">
        ${(p.fields as string[]).map((field) =>
          field === 'Message'
            ? `<textarea name="${field.toLowerCase()}" placeholder="${field}" rows="4" class="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-y"></textarea>`
            : `<input type="${field === 'Email' ? 'email' : 'text'}" name="${field.toLowerCase()}" placeholder="${field}" class="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">`
        ).join('')}
        <button type="submit" class="py-3.5 px-6 rounded-xl text-white font-semibold text-sm shadow-md transition-opacity hover:opacity-90 active:scale-95" style="background-color:${p.btnColor};">${p.btnText}</button>
      </form>
    </div>
  </section>`;

    case 'gallery':
      return `
  <section class="px-6 py-16" style="background-color:${p.bgColor};color:${p.textColor};">
    <div class="max-w-6xl mx-auto">
      ${p.title ? `<h2 class="text-2xl md:text-4xl font-bold text-center mb-10 tracking-tight">${p.title}</h2>` : ''}
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        ${(p.images as string[]).map((src) => `<div class="rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-md transition-shadow"><img src="${src}" alt="Gallery image" class="w-full h-full object-cover"></div>`).join('')}
      </div>
    </div>
  </section>`;

    case 'slider': {
      const slides = (p.slides as { title: string; description: string; image: string }[]) || [];
      if (slides.length === 0) return '';
      const uid = `sl_${Math.random().toString(36).slice(2, 8)}`;
      const slidesHtml = slides.map((slide, i) => `
    <div class="${uid}-slide absolute inset-0 transition-opacity duration-500 ${i === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}">
      ${slide.image ? `<img src="${slide.image}" alt="${slide.title}" class="w-full h-full object-cover">` : ''}
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12">
        <h2 class="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight">${slide.title}</h2>
        <p class="text-white/80 text-sm md:text-lg max-w-xl m-0">${slide.description}</p>
      </div>
    </div>`).join('');

      const dotsHtml = slides.length > 1 ? `
    <div id="${uid}-dots" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
      ${slides.map((_, i) => `<button onclick="window['${uid}'](${i})" aria-label="Slide ${i + 1}" class="w-2.5 h-2.5 rounded-full border-2 border-white transition-colors cursor-pointer p-0 ${i === 0 ? 'bg-white' : 'bg-transparent'}"></button>`).join('')}
    </div>` : '';

      const arrowsHtml = slides.length > 1 ? `
    <button onclick="window['${uid}_prev']()" aria-label="Previous slide" class="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center border-0 cursor-pointer transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
    </button>
    <button onclick="window['${uid}_next']()" aria-label="Next slide" class="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center border-0 cursor-pointer transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </button>` : '';

      return `
  <section class="relative overflow-hidden" style="background-color:${p.bgColor};" id="${uid}-section">
    <div class="relative min-h-[360px] md:min-h-[480px]" id="${uid}-track">
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
      slides[cur].classList.remove('opacity-100','pointer-events-auto');
      slides[cur].classList.add('opacity-0','pointer-events-none');
      if(dots.length){
        dots[cur].classList.remove('bg-white');
        dots[cur].classList.add('bg-transparent');
      }
      cur=(n+total)%total;
      slides[cur].classList.remove('opacity-0','pointer-events-none');
      slides[cur].classList.add('opacity-100','pointer-events-auto');
      if(dots.length){
        dots[cur].classList.remove('bg-transparent');
        dots[cur].classList.add('bg-white');
      }
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
  <!-- Tailwind CSS Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="m-0 p-0 antialiased font-sans">
${blocksHtml}
</body>
</html>`;

  const zip = new JSZip();
  zip.file('index.html', html);

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${projectName.toLowerCase().replace(/\s+/g, '-')}.zip`);
}


