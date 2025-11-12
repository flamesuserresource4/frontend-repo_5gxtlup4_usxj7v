import { useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { BarChart3, Rocket, Target, LineChart, DollarSign, Mail, Hash, Layers, Tv, Quote, ShieldCheck, Award, Sparkles, CheckCircle2, Clock, Workflow, ChevronDown, Megaphone, Users } from 'lucide-react'

const palette = {
  cream: '#F8F1E7',
  mustard: '#E2B036',
  orange: '#D16A1A',
  brown: '#4A311D',
  avocado: '#7BA16F',
  dark: '#191715',
}

function Badge({ label, value, icon: Icon, color }) {
  return (
    <div className="relative">
      <div className="rounded-full px-6 py-4 border-4 shadow-[4px_6px_0_0_rgba(0,0,0,0.25)] bg-white/90" style={{
        borderColor: color,
      }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: color }}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm" style={{ color: palette.brown }}>{label}</p>
            <p className="text-2xl font-extrabold tracking-tight" style={{ color: palette.dark }}>{value}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ title, desc, icon: Icon, color }) {
  return (
    <div className="group rounded-2xl p-6 border-2 transition transform hover:-translate-y-1 hover:shadow-xl bg-white/80 backdrop-blur" style={{
      borderColor: color,
    }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: color }}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-extrabold mb-2" style={{ color: palette.dark }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: palette.brown }}>{desc}</p>
    </div>
  )
}

function FAQ({ q, a, i }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-2 rounded-xl bg-white/90 backdrop-blur" style={{ borderColor: i % 2 ? palette.mustard : palette.orange }}>
      <button aria-expanded={open} onClick={() => setOpen(v=>!v)} className="w-full flex items-center justify-between text-left px-4 py-3">
        <span className="font-bold" style={{ color: palette.dark }}>{q}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: palette.brown }} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm" style={{ color: palette.brown }}>{a}</div>
      )}
    </div>
  )
}

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue_goal: '' })
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [cursor, setCursor] = useState({ px: 0, py: 0 })
  const splineRef = useRef(null)
  const monitorRef = useRef(null)
  const rafRef = useRef(0)
  const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onSplineLoad = (spline) => {
    splineRef.current = spline
    // Try to find a likely monitor/screen object by common names
    const candidates = ['Screen','Monitor','Display','CRT','Glass','Monitor_Screen','screen','monitor','CRT_Screen']
    for (const name of candidates) {
      const obj = spline.findObjectByName?.(name)
      if (obj) { monitorRef.current = obj; break }
    }
  }

  const aimMonitor = (px, py) => {
    const monitor = monitorRef.current
    if (!monitor) return
    // Gentle tilt: radians
    const maxTilt = 0.22 // ~12.5deg
    const rx = py * maxTilt
    const ry = -px * maxTilt
    // Apply rotation; keep z stable
    monitor.rotation.x = rx
    monitor.rotation.y = ry
    monitor.rotation.z = monitor.rotation.z || 0
  }

  const onMouseMoveHero = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const px = (x - 0.5) * 2
    const py = (y - 0.5) * 2
    setCursor({ px, py })

    if (prefersReducedMotion) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => aimMonitor(px, py))
  }

  const submitLead = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', message: 'Submitting...' })
    try {
      const res = await fetch(`${backendBase}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setStatus({ state: 'success', message: 'Thanks! We will reach out shortly.' })
      setForm({ name: '', email: '', company: '', revenue_goal: '' })
    } catch (err) {
      setStatus({ state: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  const heroTransform = useMemo(() => ({
    transform: `translate3d(${cursor.px * 8}px, ${cursor.py * 8}px, 0) rotateX(${-cursor.py * 4}deg) rotateY(${cursor.px * 4}deg)`,
    transformStyle: 'preserve-3d',
    transition: 'transform 80ms linear',
    willChange: 'transform',
  }), [cursor])

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: palette.cream }}>
      {/* Full-bleed Hero with Spline background and floating content panel */}
      <header id="hero" className="relative w-full overflow-hidden" onMouseMove={onMouseMoveHero} aria-label="Hero">
        {/* Background Spline */}
        <div className="absolute inset-0 -z-10" style={{ perspective: '1000px' }}>
          <div className="absolute inset-0" style={heroTransform} aria-hidden="true">
            <Spline onLoad={onSplineLoad} scene="https://prod.spline.design/S4k-6fqjuV5AuVZe/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          {/* Grain + color vignettes for vintage feel */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(209,106,26,0.20), transparent 45%), radial-gradient(circle at 80% 30%, rgba(226,176,54,0.18), transparent 35%), radial-gradient(circle at 50% 80%, rgba(123,161,111,0.18), transparent 40%)',
          }} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.14] mix-blend-multiply" style={{
            backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)',
          }} />
          {/* Subtle top/bottom fades to ensure contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#191715]/60 via-transparent to-[#191715]/60 pointer-events-none" />
        </div>

        {/* Content overlay */}
        <div className="container mx-auto px-6 min-h-[92vh] flex items-center">
          <div className="grid lg:grid-cols-12 gap-8 w-full">
            <div className="lg:col-span-7">
              <div className="max-w-2xl rounded-3xl border-2 p-6 sm:p-8 bg-[#F8F1E7]/90 backdrop-blur-md shadow-[10px_12px_0_rgba(0,0,0,0.25)]" style={{ borderColor: palette.brown }}>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5 border" style={{ background: palette.cream, borderColor: palette.orange }}>
                  <Sparkles className="w-4 h-4" style={{ color: palette.orange }} />
                  <span className="text-xs font-bold tracking-wider" style={{ color: palette.brown }}>Woman-Owned • Results-Driven</span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight" style={{ color: palette.dark }}>
                  Marketing That Actually Makes Money
                </h1>
                <p className="mt-4 text-lg sm:text-xl" style={{ color: palette.brown }}>
                  We mix data, creativity, and a proven playbook to grow revenue—not vanity metrics.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#contact" className="rounded-full px-6 py-3 font-extrabold shadow-[4px_6px_0_0_rgba(0,0,0,0.25)]" style={{ background: palette.orange, color: 'white' }}>
                    Book Strategy Call
                  </a>
                  <a href="#wins" className="rounded-full px-6 py-3 font-extrabold border-2" style={{ borderColor: palette.mustard, color: palette.mustard, background: palette.dark }}>
                    See Our Wins
                  </a>
                </div>
                {/* Quick proof row */}
                <div className="mt-6 grid grid-cols-2 gap-3" role="list" aria-label="Highlights">
                  <div className="flex items-center gap-2 text-sm" style={{ color: palette.brown }}><CheckCircle2 className="w-4 h-4" style={{ color: palette.avocado }} />Revenue-first approach</div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: palette.brown }}><CheckCircle2 className="w-4 h-4" style={{ color: palette.avocado }} />Transparent reporting</div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: palette.brown }}><CheckCircle2 className="w-4 h-4" style={{ color: palette.avocado }} />Fast testing cycles</div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: palette.brown }}><CheckCircle2 className="w-4 h-4" style={{ color: palette.avocado }} />Senior operators only</div>
                </div>
              </div>
            </div>

            {/* Right side: floating KPIs to add depth without blocking scene */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-end">
              <div className="grid gap-4 will-change-transform" style={{ transform: `translate3d(${cursor.px * 6}px, ${cursor.py * 4}px, 0)` }}>
                <div className="rounded-2xl px-5 py-4 border-2 bg-white/80 backdrop-blur shadow-sm" style={{ borderColor: palette.mustard }}>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5" style={{ color: palette.mustard }} />
                    <p className="text-sm font-bold" style={{ color: palette.brown }}>5.4x Avg ROAS</p>
                  </div>
                </div>
                <div className="rounded-2xl px-5 py-4 border-2 bg-white/80 backdrop-blur shadow-sm" style={{ borderColor: palette.orange }}>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5" style={{ color: palette.orange }} />
                    <p className="text-sm font-bold" style={{ color: palette.brown }}>38k+ Leads Generated</p>
                  </div>
                </div>
                <div className="rounded-2xl px-5 py-4 border-2 bg-white/80 backdrop-blur shadow-sm" style={{ borderColor: palette.avocado }}>
                  <div className="flex items-center gap-3">
                    <Megaphone className="w-5 h-5" style={{ color: palette.avocado }} />
                    <p className="text-sm font-bold" style={{ color: palette.brown }}>900+ Campaigns Launched</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Moving brand marquee */}
      <section className="py-8" aria-label="Brand marquee">
        <div className="overflow-hidden">
          <div className="flex items-center gap-10 animate-[marquee_28s_linear_infinite] whitespace-nowrap px-6" style={{ color: palette.brown }}>
            {['ACME','ORBIT','SUNCO','PIONEER','ATLAS','NOVA','VECTOR','LUMEN'].map((n,i)=> (
              <span key={i} className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.18em] opacity-80">
                <ShieldCheck className="w-4 h-4" /> {n}
              </span>
            ))}
            {['ACME','ORBIT','SUNCO','PIONEER','ATLAS','NOVA','VECTOR','LUMEN'].map((n,i)=> (
              <span key={`d-${i}`} className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.18em] opacity-80">
                <ShieldCheck className="w-4 h-4" /> {n}
              </span>
            ))}
          </div>
        </div>
        <style>{`@keyframes marquee {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </section>

      {/* Results */}
      <section id="wins" className="relative py-20" aria-labelledby="wins-heading">
        <div className="absolute inset-0 -z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 10% 10%, #D16A1A 0, transparent 40%), radial-gradient(circle at 90% 20%, #E2B036 0, transparent 35%), radial-gradient(circle at 30% 90%, #7BA16F 0, transparent 40%)' }} />
        <div className="relative container mx-auto px-6">
          <h2 id="wins-heading" className="text-4xl font-extrabold text-center" style={{ color: palette.dark }}>Proven Revenue Growth</h2>
          <p className="text-center mt-3" style={{ color: palette.brown }}>Numbers that make accountants smile.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Badge label="Avg ROAS" value="5.4x" icon={BarChart3} color={palette.orange} />
            <Badge label="Leads Generated" value="+38k" icon={Target} color={palette.mustard} />
            <Badge label="Revenue Influenced" value="$42M" icon={DollarSign} color={palette.avocado} />
            <Badge label="Campaigns Launched" value="900+" icon={Rocket} color={palette.brown} />
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6" aria-label="Testimonials" role="list">
            {[1,2,3].map((i) => (
              <div key={i} className="rounded-2xl p-6 border-2 bg-gradient-to-b from-white to-[#F8F1E7]" style={{ borderColor: palette.brown }} role="listitem">
                <div className="flex items-start gap-3">
                  <Quote className="w-6 h-6" style={{ color: palette.orange }} />
                  <p className="text-sm" style={{ color: palette.brown }}>
                    “RWS helped us scale from testing to profitability in 60 days. The dashboards made it obvious what to do next.”
                  </p>
                </div>
                <p className="mt-3 text-xs font-semibold" style={{ color: palette.dark }}>VP Growth, CPG Brand</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20" style={{ background: palette.dark }} aria-labelledby="services-heading">
        <div className="container mx-auto px-6">
          <h2 id="services-heading" className="text-4xl font-extrabold text-center" style={{ color: palette.cream }}>Full-Funnel Services</h2>
          <p className="text-center mt-3" style={{ color: '#C8BBAA' }}>Everything you need to grow—done with retro flair and modern precision.</p>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard title="SEO" desc="Revenue-first SEO: technical, content, and authority building for real growth." icon={LineChart} color={palette.mustard} />
            <ServiceCard title="Paid Ads" desc="Meta, Google, and beyond. Structured testing to scale what works." icon={Target} color={palette.orange} />
            <ServiceCard title="Social Media" desc="Standout content with a system—consistent creative that converts." icon={Hash} color={palette.avocado} />
            <ServiceCard title="Email Marketing" desc="Lifecycle flows and campaigns that turn attention into revenue." icon={Mail} color={palette.mustard} />
            <ServiceCard title="Brand Strategy" desc="Positioning, messaging, and identity that your audience feels." icon={Layers} color={palette.orange} />
            <ServiceCard title="Media Buying / TV" desc="CTV and linear planning that blends brand and performance." icon={Tv} color={palette.avocado} />
          </div>
        </div>
      </section>

      {/* Process / Why Different with timeline */}
      <section id="why" className="py-20" aria-labelledby="why-heading">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 id="why-heading" className="text-4xl font-extrabold" style={{ color: palette.dark }}>Data Over Guesswork</h2>
              <p className="mt-4 leading-relaxed" style={{ color: palette.brown }}>
                Our methodology focuses on measurable inputs and meaningful outcomes. Clear hypotheses, rapid testing, and dashboards that make the next move obvious.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl p-4 border-2 bg-white" style={{ borderColor: palette.mustard }}>
                  <p className="font-bold" style={{ color: palette.dark }}>Trackable Results</p>
                  <p className="text-sm mt-1" style={{ color: palette.brown }}>Every campaign ships with reporting tied to revenue, not likes.</p>
                </div>
                <div className="rounded-xl p-4 border-2 bg-white" style={{ borderColor: palette.orange }}>
                  <p className="font-bold" style={{ color: palette.dark }}>Proven Playbooks</p>
                  <p className="text-sm mt-1" style={{ color: palette.brown }}>We reuse what works and retire what doesn’t—fast.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl p-1" style={{ background: `linear-gradient(135deg, ${palette.orange}, ${palette.mustard})` }}>
              <div className="rounded-2xl p-8" style={{ background: palette.cream }}>
                <h3 className="text-2xl font-extrabold flex items-center gap-2" style={{ color: palette.dark }}><Workflow className="w-5 h-5" /> Our Process</h3>
                <ol className="mt-4 space-y-4">
                  {[{t:'Discover',d:'Audit, ICP, messaging, and goals alignment.',i:Clock},{t:'Plan',d:'Roadmap KPIs, experiments, and resourcing.',i:Target},{t:'Execute',d:'Rapid sprints across channels.',i:Rocket},{t:'Optimize',d:'Double-down on winners. Cut what doesn’t work.',i:LineChart}].map((step, idx)=> (
                    <li key={idx} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: idx%2?palette.mustard:palette.orange }}>
                        <step.i className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: palette.dark }}>{step.t}</p>
                        <p className="text-sm" style={{ color: palette.brown }}>{step.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Stories with video (lazy) */}
      <section id="stories" className="py-20" style={{ background: palette.cream }} aria-labelledby="stories-heading">
        <div className="container mx-auto px-6">
          <h2 id="stories-heading" className="text-4xl font-extrabold text-center" style={{ color: palette.dark }}>Client Stories</h2>
          <p className="text-center mt-3" style={{ color: palette.brown }}>Short, real-world results. More in Case Studies.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { label:'CPG Brand', desc:'+120% revenue in 90 days', src:'https://www.w3schools.com/html/mov_bbb.mp4' },
              { label:'B2B SaaS', desc:'CAC -35% with lifecycle overhaul', src:'https://www.w3schools.com/html/movie.mp4' },
              { label:'Marketplace', desc:'3.2x ROAS at scale', src:'https://www.w3schools.com/html/mov_bbb.mp4' },
            ].map((v,i)=> (
              <div key={i} className="rounded-2xl overflow-hidden border-2 bg-white" style={{ borderColor: palette.brown }}>
                <div className="p-4">
                  <p className="text-xs font-bold" style={{ color: palette.orange }}>{v.label}</p>
                  <p className="text-sm" style={{ color: palette.brown }}>{v.desc}</p>
                </div>
                <video controls className="w-full h-48 object-cover" preload="none" playsInline>
                  <source src={v.src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section aria-labelledby="faq-heading" className="py-20">
        <div className="container mx-auto px-6">
          <h2 id="faq-heading" className="text-4xl font-extrabold text-center" style={{ color: palette.dark }}>FAQs</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <FAQ q="How fast can we start?" a="Discovery is usually within 3 days. Launch in 1–2 weeks depending on scope." i={0} />
            <FAQ q="What industries do you specialize in?" a="CPG, SaaS, marketplaces, and service businesses with clear revenue goals." i={1} />
            <FAQ q="How do you report on results?" a="Weekly scorecards and monthly deep dives tied to revenue, CAC, and LTV." i={2} />
            <FAQ q="Who will I work with?" a="A senior operator and a dedicated channel specialist—no hand-offs or bloat." i={3} />
          </div>
        </div>
      </section>

      {/* Final CTA + Contact */}
      <section id="contact" className="py-20" style={{ background: palette.dark }} aria-labelledby="contact-heading">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 id="contact-heading" className="text-4xl font-extrabold" style={{ color: palette.cream }}>Start Growing Your Revenue</h2>
              <p className="mt-3" style={{ color: '#C8BBAA' }}>Tell us a bit about your goals and we’ll follow up with a plan.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" className="rounded-full px-6 py-3 font-extrabold shadow-[4px_6px_0_0_rgba(0,0,0,0.35)]" style={{ background: palette.mustard, color: palette.dark }}>Start Now</a>
                <a href="#hero" className="rounded-full px-6 py-3 font-extrabold border-2" style={{ borderColor: palette.avocado, color: palette.avocado }}>Book Consultation</a>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-xl p-4 border-2" style={{ borderColor: palette.avocado, background: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-sm" style={{ color: palette.cream }}>Woman-founded. Built for outcomes.</p>
                </div>
                <div className="rounded-xl p-4 border-2" style={{ borderColor: palette.mustard, background: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-sm" style={{ color: palette.cream }}>Transparent reporting and clear decisions.</p>
                </div>
              </div>
            </div>

            <form onSubmit={submitLead} className="rounded-2xl p-6 border-2 bg-white/90 backdrop-blur" style={{ borderColor: palette.mustard }}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: palette.brown }}>Name</label>
                  <input required value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} className="w-full rounded-lg px-3 py-2 border focus:outline-none focus:ring-2" style={{ borderColor: palette.mustard }} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: palette.brown }}>Email</label>
                  <input required type="email" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} className="w-full rounded-lg px-3 py-2 border focus:outline-none focus:ring-2" style={{ borderColor: palette.mustard }} placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: palette.brown }}>Company</label>
                  <input value={form.company} onChange={(e)=>setForm({ ...form, company: e.target.value })} className="w-full rounded-lg px-3 py-2 border focus:outline-none focus:ring-2" style={{ borderColor: palette.mustard }} placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: palette.brown }}>Revenue Goal</label>
                  <input value={form.revenue_goal} onChange={(e)=>setForm({ ...form, revenue_goal: e.target.value })} className="w-full rounded-lg px-3 py-2 border focus:outline-none focus:ring-2" style={{ borderColor: palette.mustard }} placeholder="$500k / year" />
                </div>
              </div>
              <button type="submit" className="mt-6 w-full rounded-full px-6 py-3 font-extrabold shadow-[4px_6px_0_0_rgba(0,0,0,0.25)]" style={{ background: palette.orange, color: 'white' }}>
                {status.state === 'loading' ? 'Sending...' : 'Send'}
              </button>
              {status.state !== 'idle' && (
                <p className="mt-3 text-center text-sm" style={{ color: status.state === 'success' ? palette.avocado : palette.orange }}>
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center" style={{ background: palette.dark }}>
        <p className="text-xs" style={{ color: '#C8BBAA' }}>© {new Date().getFullYear()} Running With Strategy. All rights reserved.</p>
      </footer>
    </div>
  )
}
