import type { TransitionBeforePreparationEvent, TransitionBeforeSwapEvent } from 'astro:transitions/client';

const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const THEME_KEY = 'nextai-tema';
const currentMode = () => (root.getAttribute('data-deck') === 'light' ? 'light' : 'dark');

/* ---------- tema ---------- */
function syncThemeLabel() {
  const btn = document.getElementById('theme');
  if (!btn) return;
  const light = currentMode() === 'light';
  // O icone mostra o tema para o qual o clique leva
  btn.setAttribute('aria-label', light ? 'Mudar para tema escuro' : 'Mudar para tema claro');
  btn.setAttribute('aria-pressed', String(light));
}
function setTheme(mode: 'dark' | 'light') {
  if (mode === 'light') root.setAttribute('data-deck', 'light');
  else root.removeAttribute('data-deck');
  syncThemeLabel();
  try {
    localStorage.setItem(THEME_KEY, mode);
  } catch {
    /* storage bloqueado */
  }
}

/* ---------- transicao entre paginas ---------- */
// O tempo de cobertura casa com a animacao do CSS: a troca de pagina acontece com as setas no meio da tela
const WIPE_COVER = 360;
const WIPE_TOTAL = 960;
let wipe: HTMLElement | null = null;
let wipeTimer = 0;

function playWipe(back: boolean) {
  if (!wipe) {
    wipe = document.createElement('div');
    wipe.id = 'wipe';
    wipe.setAttribute('aria-hidden', 'true');
    wipe.innerHTML = '<i></i><i></i><i></i>';
    // Fora do body, para nao ser trocado junto com a pagina e a animacao seguir continua
    root.appendChild(wipe);
  }
  wipe.className = '';
  void wipe.offsetWidth;
  wipe.className = back ? 'go back' : 'go';
  clearTimeout(wipeTimer);
  wipeTimer = window.setTimeout(() => {
    if (wipe) wipe.className = '';
  }, WIPE_TOTAL);
}

document.addEventListener('astro:before-preparation', (e) => {
  if (reduce) return;
  const ev = e as TransitionBeforePreparationEvent;
  const t0 = performance.now();
  playWipe(ev.direction === 'back');
  const original = ev.loader;
  ev.loader = async () => {
    await original();
    const wait = WIPE_COVER - (performance.now() - t0);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  };
});

// A nova pagina chega sem as marcas que o script do head poe no <html>
document.addEventListener('astro:before-swap', (e) => {
  const next = (e as TransitionBeforeSwapEvent).newDocument.documentElement;
  next.classList.add('js');
  if (currentMode() === 'light') next.setAttribute('data-deck', 'light');
  else next.removeAttribute('data-deck');
});

/* ---------- globais (uma vez so) ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('nav')?.classList.remove('open');
    document.getElementById('menu')?.setAttribute('aria-expanded', 'false');
  }
});

/* link direto para um item: abre o acordeao correspondente */
function openFromHash() {
  const el = location.hash ? document.getElementById(location.hash.slice(1)) : null;
  if (el instanceof HTMLDetailsElement) {
    el.open = true;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
}
addEventListener('hashchange', openFromHash);

/* ---------- contadores ---------- */
type Counter = { el: HTMLElement; to: number; pad: number; rest: string };
function collectCounters(sl: Element): Counter[] {
  const out: Counter[] = [];
  sl.querySelectorAll<HTMLElement>('[data-c]').forEach((el) => {
    const m = (el.textContent ?? '').trim().match(/^(\d{1,3})(\D.*)?$/);
    if (m) out.push({ el, to: +m[1], pad: m[1].length, rest: m[2] ?? '' });
  });
  return out;
}
const fmt = (c: Counter, v: number) => String(v).padStart(c.pad, '0') + c.rest;
function runCounters(list: Counter[]) {
  if (!list.length || reduce) return;
  const t0 = performance.now();
  const step = (t: number) => {
    const p = Math.min(1, Math.max(0, (t - t0 - 250) / 1200));
    const e = 1 - Math.pow(1 - p, 3);
    list.forEach((c) => (c.el.textContent = fmt(c, Math.round(c.to * e))));
    if (p < 1) requestAnimationFrame(step);
  };
  list.forEach((c) => (c.el.textContent = fmt(c, 0)));
  requestAnimationFrame(step);
}

/* ---------- por pagina: roda a cada navegacao ---------- */
const started = new WeakSet<Node>();
let cleanups: Array<() => void> = [];

function init() {
  if (started.has(document.body)) return;
  started.add(document.body);
  cleanups.forEach((f) => f());
  cleanups = [];

  syncThemeLabel();
  document
    .getElementById('theme')
    ?.addEventListener('click', () => setTheme(currentMode() === 'dark' ? 'light' : 'dark'));

  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menu') as HTMLButtonElement | null;
  const closeMenu = () => {
    nav?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  };
  menuBtn?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  /* cascata: atraso crescente por grupo (.sol ou bloco) */
  document.querySelectorAll<HTMLElement>('.sl').forEach((sl) => {
    const counts = new Map<Element, number>();
    sl.querySelectorAll<HTMLElement>('.r').forEach((el) => {
      if (el.style.getPropertyValue('--d')) return;
      const group = el.closest('.sol') ?? sl;
      const n = counts.get(group) ?? 0;
      counts.set(group, n + 1);
      el.style.setProperty('--d', (Math.min(n * 0.07, 0.9) + 0.05).toFixed(2) + 's');
    });
  });

  /* revela cada bloco ao entrar na tela */
  const blocks = [...document.querySelectorAll<HTMLElement>('.sl')];
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('on');
          runCounters(collectCounters(en.target));
          io.unobserve(en.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );
    blocks.forEach((b) => io.observe(b));
    cleanups.push(() => io.disconnect());
  } else {
    blocks.forEach((b) => b.classList.add('on'));
  }

  /* destaca a secao atual no menu (so na home) */
  const onHome = location.pathname === '/' || location.pathname === '';
  const links = onHome ? [...document.querySelectorAll<HTMLAnchorElement>('.nav a[href^="/#"]')] : [];
  const secs = links
    .map((a) => document.getElementById(a.getAttribute('href')!.slice(2)))
    .filter((s): s is HTMLElement => !!s);
  if ('IntersectionObserver' in window && secs.length) {
    const so = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.classList.toggle('cur', a.getAttribute('href') === '/#' + en.target.id));
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    secs.forEach((s) => so.observe(s));
    cleanups.push(() => so.disconnect());
  }

  openFromHash();
}

init();
document.addEventListener('astro:page-load', init);

/* ---------- fluxo: tracos que correm para a direita, como agua e dados ---------- */
// O canvas e persistente entre paginas (transition:persist), entao o laco roda uma vez
const canvas = document.getElementById('flow') as HTMLCanvasElement | null;
const ctx = canvas?.getContext('2d');
if (canvas && ctx) {
  type P = { x: number; y: number; v: number; l: number; w: number; p: number; c: number };
  let W = 0;
  let H = 0;
  let parts: P[] = [];
  let cols: string[] = [];
  let alpha = 0.3;
  let lastMode = '';
  const css = (n: string) => getComputedStyle(root).getPropertyValue(n).trim();
  const size = () => {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = canvas.width = Math.round(innerWidth * d);
    H = canvas.height = Math.round(innerHeight * d);
    const n = innerWidth < 720 ? 16 : 36;
    parts = Array.from({ length: n }, (_, k) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      v: W * (0.0007 + Math.random() * 0.0022),
      l: W * (0.02 + Math.random() * 0.06),
      w: Math.max(1, W * 0.0012 * Math.random() + 0.5),
      p: Math.random() * 6.28,
      c: k % 3,
    }));
  };
  const tick = (t: number) => {
    if (lastMode !== currentMode()) {
      cols = [css('--c1'), css('--c2'), css('--c3')];
      alpha = parseFloat(css('--flow-a')) || 0.3;
      lastMode = currentMode();
    }
    ctx.clearRect(0, 0, W, H);
    for (const q of parts) {
      const y = q.y + Math.sin(t / 1600 + q.p + (q.x / W) * 5) * H * 0.012;
      const g = ctx.createLinearGradient(q.x - q.l, 0, q.x, 0);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(1, cols[q.c]);
      ctx.globalAlpha = alpha * (0.4 + 0.6 * (q.l / (W * 0.08)));
      ctx.strokeStyle = g;
      ctx.lineWidth = q.w;
      ctx.beginPath();
      ctx.moveTo(q.x - q.l, y);
      ctx.lineTo(q.x, y);
      ctx.stroke();
      if (!reduce) {
        q.x += q.v;
        if (q.x - q.l > W) {
          q.x = -Math.random() * W * 0.2;
          q.y = Math.random() * H;
        }
      }
    }
    ctx.globalAlpha = 1;
    if (!reduce) requestAnimationFrame(tick);
  };
  size();
  requestAnimationFrame(tick);
  let rz = 0;
  addEventListener('resize', () => {
    clearTimeout(rz);
    rz = window.setTimeout(size, 150);
  });
}
