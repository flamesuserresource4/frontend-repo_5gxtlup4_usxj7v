import { LineChart, Target, Hash, Mail, Layers, Tv, Sparkles, Wrench, BarChart3, PenTool, Gauge } from 'lucide-react'

const palette = { cream:'#F8F1E7', mustard:'#E2B036', orange:'#D16A1A', brown:'#4A311D', avocado:'#7BA16F', dark:'#191715' }

export default function Services() {
  const offerings = [
    { t:'SEO', i:LineChart, c:palette.mustard, bullets:['Technical audits & fixes','Content strategy & production','Authority building & PR','Measurement tied to revenue'] },
    { t:'Paid Media', i:Target, c:palette.orange, bullets:['Meta, Google, YouTube, LinkedIn','Creative & audience testing frameworks','Budget pacing & MMM-informed allocation','ROAS, MER, CAC guardrails'] },
    { t:'Social Content', i:Hash, c:palette.avocado, bullets:['Content pillars & cadence','Production systems & UGC','Distribution & community','Reporting that improves output'] },
    { t:'Lifecycle & CRM', i:Mail, c:palette.mustard, bullets:['Onboarding & lifecycle mapping','Segmentation & personalization','Campaign calendars','Deliverability & attribution hygiene'] },
    { t:'Brand Strategy', i:PenTool, c:palette.orange, bullets:['Positioning & messaging','Identity systems','Guidelines & toolkits','Research & interviews'] },
    { t:'Media Buying / TV', i:Tv, c:palette.avocado, bullets:['CTV & linear planning','Integrated brand/performance','Lift testing & incrementality','Holistic measurement'] },
    { t:'Analytics', i:BarChart3, c:palette.brown, bullets:['GA4 + server-side','Attribution & modeled insights','Dashboards & scorecards','Data pipelines & hygiene'] },
    { t:'CRO', i:Gauge, c:palette.mustard, bullets:['Hypothesis backlog','Experiment design','UX copy & design','Implementation & analysis'] },
  ]

  const packages = [
    { n:'Growth Sprint', c:palette.orange, p:'$8k / mo', d:'40 hours/mo focused on the highest ROI levers. Weekly standup. Monthly deep dive.' },
    { n:'Full-Funnel', c:palette.mustard, p:'$18k / mo', d:'Strategy + creative + media. Multi-channel playbooks with rigorous reporting.' },
    { n:'Advisor', c:palette.avocado, p:'$4k / mo', d:'Senior operator guidance, weekly working sessions, and scorecard reviews.' },
  ]

  return (
    <main className="min-h-screen" style={{ background: palette.cream }}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="hero-aurora"><div className="blob blob-1"/><div className="blob blob-2"/><div className="blob blob-3"/></div>
          <div className="hero-scanlines"/><div className="hero-grain"/><div className="hero-vignette"/>
        </div>
        <div className="relative container mx-auto px-6 pt-20 pb-16">
          <div className="max-w-3xl glass-card rounded-3xl border-2 p-8" style={{ borderColor: palette.brown }}>
            <h1 className="text-4xl sm:text-5xl font-extrabold" style={{ color: palette.dark }}>Services</h1>
            <p className="mt-4 text-lg" style={{ color: palette.brown }}>A robust mix of strategy, creative, and media engineered for revenue impact. Explore our capabilities and packages.</p>
          </div>
        </div>
      </section>

      {/* Offerings grid */}
      <section className="py-16" aria-labelledby="offerings">
        <div className="container mx-auto px-6">
          <h2 id="offerings" className="text-3xl font-extrabold text-center" style={{ color: palette.dark }}>Capabilities</h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((o, i) => (
              <div key={i} className="rounded-2xl p-6 border-2 bg-white/95 backdrop-blur lift-card" style={{ borderColor: o.c }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: o.c }}>
                  <o.i className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold" style={{ color: palette.dark }}>{o.t}</p>
                <ul className="mt-2 text-sm list-disc pl-5 space-y-1" style={{ color: palette.brown }}>
                  {o.bullets.map((b,bi)=> <li key={bi}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16" aria-labelledby="packages" style={{ background: palette.dark }}>
        <div className="container mx-auto px-6">
          <h2 id="packages" className="text-3xl font-extrabold text-center" style={{ color: palette.cream }}>Packages</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {packages.map((p,i)=> (
              <div key={i} className="rounded-2xl p-6 border-2 glass-card lift-card" style={{ borderColor: p.c }}>
                <p className="text-xs font-extrabold" style={{ color: p.c }}>{p.n}</p>
                <p className="text-3xl font-extrabold mt-1" style={{ color: palette.cream }}>{p.p}</p>
                <p className="text-sm mt-2" style={{ color: '#C8BBAA' }}>{p.d}</p>
                <a href="#contact" className="mt-6 inline-block rounded-full px-5 py-2 font-extrabold border-2" style={{ borderColor: p.c, color: palette.dark, background: palette.mustard }}>Start</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" aria-labelledby="svc-faq">
        <div className="container mx-auto px-6">
          <h2 id="svc-faq" className="text-3xl font-extrabold text-center" style={{ color: palette.dark }}>Service FAQs</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {[
              { q:'How do engagements start?', a:'We begin with a sprint: audit, scope, KPI alignment, and roadmap.' },
              { q:'What does reporting look like?', a:'Weekly scorecards and monthly deep dives tied to revenue, CAC, LTV.' },
              { q:'Do you work in-house or async?', a:'Both. We adapt to your operating cadence while keeping momentum high.' },
              { q:'What makes you different?', a:'Operator-led teams, taste + rigor, and relentless focus on results.' },
            ].map((f, i)=> (
              <details key={i} className="rounded-xl p-4 border-2 bg-white/95 lift-card" style={{ borderColor: i%2?palette.mustard:palette.orange }}>
                <summary className="cursor-pointer font-bold" style={{ color: palette.dark }}>{f.q}</summary>
                <p className="mt-2 text-sm" style={{ color: palette.brown }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
