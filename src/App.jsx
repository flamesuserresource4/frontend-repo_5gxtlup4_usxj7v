import { useState } from 'react'
import Spline from '@splinetool/react-spline'
import { BarChart3, Rocket, Target, LineChart, DollarSign, Mail, Hash, Layers, Tv, Star, Quote, ShieldCheck } from 'lucide-react'

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
      <div className="rounded-full px-6 py-4 border-4 shadow-[4px_6px_0_0_rgba(0,0,0,0.25)]" style={{
        background: palette.cream,
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
    <div className="group rounded-2xl p-6 border-2 transition transform hover:-translate-y-1 hover:shadow-xl" style={{
      borderColor: color,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
    }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: color }}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-extrabold mb-2" style={{ color: palette.dark }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: palette.brown }}>{desc}</p>
    </div>
  )
}

function RetroEyes({ px = 0, py = 0 }) {
  const eyeMoveX = px * 6
  const eyeMoveY = py * 6
  return (
    <div className="absolute -bottom-6 -left-6 sm:-left-10 w-44 rounded-2xl border-2 shadow-[6px_8px_0_rgba(0,0,0,0.25)]" style={{ background: palette.cream, borderColor: palette.brown }}>
      <div className="px-4 pt-3 pb-4">
        <div className="text-xs font-bold mb-2" style={{ color: palette.brown }}>RWS Retro Terminal</div>
        <div className="mx-auto w-28 h-14 rounded-xl flex items-center justify-between px-3 py-2 border" style={{ borderColor: palette.brown, background: '#fff' }}>
          {[0,1].map(i => (
            <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ borderColor: palette.brown, background: palette.cream }}>
              <div className="w-3.5 h-3.5 rounded-full" style={{ background: palette.orange, transform: `translate(${eyeMoveX}px, ${eyeMoveY}px)` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue_goal: '' })
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [cursor, setCursor] = useState({ px: 0, py: 0 })
  const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onMouseMoveHero = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const px = (x - 0.5) * 2
    const py = (y - 0.5) * 2
    setCursor({ px, py })
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

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: palette.cream }}>
      {/* Hero */}
      <header id="hero" className="relative w-full overflow-hidden" onMouseMove={onMouseMoveHero}>
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-6 items-center min-h-[86vh] pt-6">
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5" style={{ background: palette.cream, border: `2px solid ${palette.orange}` }}>
              <Star className="w-4 h-4" style={{ color: palette.orange }} />
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
            <RetroEyes px={cursor.px} py={cursor.py} />
          </div>
          <div className="relative h-[52vh] sm:h-[60vh] lg:h-[70vh] rounded-3xl border-4 overflow-hidden shadow-[10px_12px_0_rgba(0,0,0,0.25)]" style={{ borderColor: palette.brown }}>
            <div className="absolute inset-0" style={{ transform: `translate3d(${cursor.px*12}px, ${cursor.py*12}px, 0) rotateX(${ -cursor.py*6 }deg) rotateY(${ cursor.px*6 }deg)`, transformStyle: 'preserve-3d', transition: 'transform 80ms linear' }}>
              <Spline scene="https://prod.spline.design/S4k-6fqjuV5AuVZe/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(209,106,26,0.20),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(226,176,54,0.20),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(123,161,111,0.20),transparent_40%)] pointer-events-none"></div>
          </div>
        </div>
      </header>

      {/* Credibility strip */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {["ACME","ORBIT","SUNCO","PIONEER","ATLAS"].map((name,i)=> (
              <div key={i} className="px-5 py-3 rounded-xl border-2 text-sm font-extrabold tracking-wide" style={{ borderColor: palette.brown, color: palette.brown, background: '#fff' }}>
                {name}
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs flex items-center justify-center gap-2" style={{ color: palette.brown }}>
            <ShieldCheck className="w-4 h-4" /> Trusted by ambitious brands and operators
          </p>
        </div>
      </section>

      {/* Results */}
      <section id="wins" className="relative py-20">
        <div className="absolute inset-0 -z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 10% 10%, #D16A1A 0, transparent 40%), radial-gradient(circle at 90% 20%, #E2B036 0, transparent 35%), radial-gradient(circle at 30% 90%, #7BA16F 0, transparent 40%)' }} />
        <div className="relative container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center" style={{ color: palette.dark }}>Proven Revenue Growth</h2>
          <p className="text-center mt-3" style={{ color: palette.brown }}>Numbers that make accountants smile.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Badge label="Avg ROAS" value="5.4x" icon={BarChart3} color={palette.orange} />
            <Badge label="Leads Generated" value="+38k" icon={Target} color={palette.mustard} />
            <Badge label="Revenue Influenced" value="$42M" icon={DollarSign} color={palette.avocado} />
            <Badge label="Campaigns Launched" value="900+" icon={Rocket} color={palette.brown} />
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="rounded-2xl p-6 border-2" style={{ borderColor: palette.brown, background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,241,231,0.95))' }}>
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
      <section id="services" className="py-20" style={{ background: palette.dark }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center" style={{ color: palette.cream }}>Full-Funnel Services</h2>
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

      {/* Why Different */}
      <section id="why" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl font-extrabold" style={{ color: palette.dark }}>Data Over Guesswork</h2>
              <p className="mt-4 leading-relaxed" style={{ color: palette.brown }}>
                Our methodology focuses on measurable inputs and meaningful outcomes. Clear hypotheses, rapid testing, and dashboards that make the next move obvious.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl p-4 border-2" style={{ borderColor: palette.mustard, background: 'white' }}>
                  <p className="font-bold" style={{ color: palette.dark }}>Trackable Results</p>
                  <p className="text-sm mt-1" style={{ color: palette.brown }}>Every campaign ships with reporting tied to revenue, not likes.</p>
                </div>
                <div className="rounded-xl p-4 border-2" style={{ borderColor: palette.orange, background: 'white' }}>
                  <p className="font-bold" style={{ color: palette.dark }}>Proven Playbooks</p>
                  <p className="text-sm mt-1" style={{ color: palette.brown }}>We reuse what works and retire what doesn’t—fast.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl p-1" style={{ background: `linear-gradient(135deg, ${palette.orange}, ${palette.mustard})` }}>
              <div className="rounded-2xl p-8" style={{ background: palette.cream }}>
                <h3 className="text-2xl font-extrabold" style={{ color: palette.dark }}>Content Engine</h3>
                <p className="mt-2 text-sm" style={{ color: palette.brown }}>
                  Our all-in-one content system turns strategy into a weekly drumbeat: briefs, production, edits, approvals, and distribution—on repeat.
                </p>
                <ul className="mt-4 space-y-2 text-sm" style={{ color: palette.brown }}>
                  <li>• Modular content mapped to funnel stages</li>
                  <li>• Asset library with versioning</li>
                  <li>• Performance scorecards per channel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with video */}
      <section id="stories" className="py-20" style={{ background: palette.cream }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center" style={{ color: palette.dark }}>Client Stories</h2>
          <p className="text-center mt-3" style={{ color: palette.brown }}>Short, real-world results. More in Case Studies.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { label:'CPG Brand', desc:'+120% revenue in 90 days', src:'https://www.w3schools.com/html/mov_bbb.mp4' },
              { label:'B2B SaaS', desc:'CAC -35% with lifecycle overhaul', src:'https://www.w3schools.com/html/movie.mp4' },
              { label:'Marketplace', desc:'3.2x ROAS at scale', src:'https://www.w3schools.com/html/mov_bbb.mp4' },
            ].map((v,i)=> (
              <div key={i} className="rounded-2xl overflow-hidden border-2" style={{ borderColor: palette.brown, background: '#fff' }}>
                <div className="p-4">
                  <p className="text-xs font-bold" style={{ color: palette.orange }}>{v.label}</p>
                  <p className="text-sm" style={{ color: palette.brown }}>{v.desc}</p>
                </div>
                <video controls className="w-full h-48 object-cover">
                  <source src={v.src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + Contact */}
      <section id="contact" className="py-20" style={{ background: palette.dark }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-extrabold" style={{ color: palette.cream }}>Start Growing Your Revenue</h2>
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

            <form onSubmit={submitLead} className="rounded-2xl p-6 border-2" style={{ borderColor: palette.mustard, background: 'rgba(255,255,255,0.9)' }}>
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
