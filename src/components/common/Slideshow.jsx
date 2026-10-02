import { useEffect, useState } from 'react'
// Temporary placeholder slides (inline SVG). Replace `src` with real photo URLs later.
const svg = (a, b, label) => 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="1200" height="600" fill="url(#g)"/><circle cx="950" cy="170" r="70" fill="#D4A373" opacity=".7"/><path d="M0 460 Q300 400 600 460 T1200 450 V600 H0Z" fill="#fff" opacity=".12"/><text x="60" y="560" fill="#fff" opacity=".55" font-family="sans-serif" font-size="22">${label}</text></svg>`)
export const defaultSlides = [
  { src: svg('#1F3A5F', '#4F6D8A', 'Placeholder · Ocean view'), alt: 'Ocean view' },
  { src: svg('#4F6D8A', '#1F3A5F', 'Placeholder · Deluxe room'), alt: 'Deluxe room' },
  { src: svg('#1F3A5F', '#2b4f7e', 'Placeholder · Poolside'), alt: 'Poolside' },
]
export default function Slideshow({ slides = defaultSlides, interval = 4500, children }) {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % slides.length), interval); return () => clearInterval(t) }, [slides.length, interval, i])
  const go = d => setI((i + d + slides.length) % slides.length)
  return <div className="relative h-[26rem] md:h-[32rem] rounded-lg overflow-hidden bg-primary">
    {slides.map((s, k) => <img key={k} src={s.src} alt={s.alt} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${k === i ? 'opacity-100' : 'opacity-0'}`} />)}
    <div className="absolute inset-0 bg-primary/55" />
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">{children}</div>
    <button aria-label="Previous" onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-2xl px-2">‹</button>
    <button aria-label="Next" onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-2xl px-2">›</button>
    <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-10">{slides.map((_, k) => <button key={k} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-accent' : 'w-2 bg-white/60'}`} />)}</div>
  </div>
}
