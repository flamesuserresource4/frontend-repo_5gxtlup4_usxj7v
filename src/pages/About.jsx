import { Users, Target, Rocket, LineChart, Award, HeartHandshake, ShieldCheck, Sparkles, Quote } from 'lucide-react'

const palette = { cream:'#F8F1E7', mustard:'#E2B036', orange:'#D16A1A', brown:'#4A311D', avocado:'#7BA16F', dark:'#191715' }

export default function About() {
  const principles = [
    { t:'Revenue First', d:'We prioritize actions that move revenue, CAC, and LTV—not vanity metrics.', i:Target, c:palette.orange },
    { t:'Taste + Rigor', d:'Creative that converts, underpinned by clear hypotheses and testing.', i:Sparkles, c:palette.mustard },
    { t:'Operator-Led', d:'You work with senior operators—no hand-offs, no bloat.', i:Users, c:palette.avocado },
    { t:'Radical Clarity', d:'Transparent reporting, simple scorecards, confident decisions.', i:ShieldCheck, c:palette.brown },
  ]

  const team = [
    { name:'Alex Rivera', role:'Founder, Strategy', img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop', bio:'15+ years scaling CPG and SaaS. Ex-operator turned advisor. Data-obsessed, creative-positive.' },
    { name:'Jordan Kim', role:'Performance Lead', img:'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=600&auto=format&fit=crop', bio:'Media buying across Meta, Google, and CTV. Loves structured testing and LTV-led planning.' },
    { name:'Rae Patel', role:'Lifecycle & CRM', img:'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=600&auto=format&fit=crop', bio:'Lifecycle systems that turn attention into revenue. Email, SMS, onboarding, and retention.' },
  ]

  return (
    <main className="min-h-screen" style={{ background: palette.cream }}>
      {/* Page hero */}
      <section aria-label="About hero" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="hero-aurora">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>
          <div className="hero-scanlines" />
          <div className="hero-grain" />
          <div className="hero-vignette" />
        </div>
        <div className="relative container mx-auto px-6 pt-20 pb-16">
          <div className="max-w-3xl glass-card rounded-3xl border-2 p-8" style={{ borderColor: palette.brown }}>
            <p className="text-xs font-bold inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4" style={{ color: palette.brown, background: palette.cream, borderColor: palette.orange }}>
              <Award className="w-4 h-4" style={{ color: palette.orange }} /> Woman-Owned • Results-Driven
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight" style={{ color: palette.dark }}>
              About Running With Strategy
            </h1>
            <p className="mt-4 text-lg" style={{ color: palette.brown }}>
              We mix rigorous strategy, creative craftsmanship, and a revenue-first mindset. Founded to bring clarity to noisy growth, we build operating systems that compound.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16" aria-labelledby="principles-heading">
        <div className="container mx-auto px-6">
          <h2 id="principles-heading" className="text-3xl font-extrabold text-center" style={{ color: palette.dark }}>Principles We Operate By</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, i) => (
              <div key={i} className="rounded-2xl p-6 border-2 bg-white/95 backdrop-blur lift-card" style={{ borderColor: p.c }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: p.c }}>
                  <p.i className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold" style={{ color: palette.dark }}>{p.t}</p>
                <p className="text-sm mt-1" style={{ color: palette.brown }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16" aria-labelledby="timeline-heading">
        <div className="container mx-auto px-6">
          <h2 id="timeline-heading" className="text-3xl font-extrabold" style={{ color: palette.dark }}>How We Got Here</h2>
          <ol className="mt-8 space-y-6">
            {[
              { y:'2016', h:'Started as an operator-led collective', d:'Built growth systems inside brands before taking them to market.' },
              { y:'2019', h:'Expanded performance practice', d:'Added creative, CRO, and lifecycle to deliver full-funnel outcomes.' },
              { y:'2022', h:'CTV and MMM pilots', d:'Brought brand and performance together with smarter allocation.' },
              { y:'Today', h:'Revenue-first partner', d:'Run playbooks that turn attention into measurable revenue.' },
            ].map((row, idx) => (
              <li key={idx} className="grid sm:grid-cols-8 gap-4 items-start">
                <div className="sm:col-span-2 font-extrabold tracking-wide text-sm" style={{ color: palette.orange }}>{row.y}</div>
                <div className="sm:col-span-6 rounded-xl p-5 border-2 bg-white lift-card" style={{ borderColor: palette.mustard }}>
                  <p className="font-bold" style={{ color: palette.dark }}>{row.h}</p>
                  <p className="text-sm" style={{ color: palette.brown }}>{row.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="py-16" aria-labelledby="team-heading">
        <div className="container mx-auto px-6">
          <h2 id="team-heading" className="text-3xl font-extrabold text-center" style={{ color: palette.dark }}>The Team</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <article key={i} className="rounded-2xl border-2 overflow-hidden bg-white lift-card" style={{ borderColor: palette.brown }}>
                <img src={m.img} alt={m.name} className="w-full h-56 object-cover" loading="lazy" />
                <div className="p-6">
                  <p className="text-sm font-extrabold" style={{ color: palette.dark }}>{m.name}</p>
                  <p className="text-xs" style={{ color: palette.orange }}>{m.role}</p>
                  <p className="text-sm mt-2" style={{ color: palette.brown }}>{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Creds */}
      <section className="py-16" aria-labelledby="creds-heading" style={{ background: palette.dark }}>
        <div className="container mx-auto px-6">
          <h2 id="creds-heading" className="text-3xl font-extrabold text-center" style={{ color: palette.cream }}>Selected Credentials</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Meta Blueprint","Google Ads","HubSpot","Klaviyo","GA4","Segment","Shopify","Mixpanel"].map((n,i)=> (
              <div key={i} className="rounded-xl px-4 py-3 border-2 text-center" style={{ borderColor:'#3a332b', color: '#C8BBAA' }}>{n}</div>
            ))}
          </div>
          <div className="mt-10 max-w-3xl mx-auto glass-card rounded-2xl border-2 p-6" style={{ borderColor: palette.mustard }}>
            <p className="text-sm flex gap-3" style={{ color: '#C8BBAA' }}>
              <Quote className="w-5 h-5" style={{ color: palette.mustard }} />
              "The rare partner who blends disciplined thinking with creative instincts—and ships fast."
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" aria-labelledby="about-cta">
        <div className="container mx-auto px-6">
          <div className="rounded-3xl p-8 border-2 glass-card" style={{ borderColor: palette.mustard }}>
            <h2 id="about-cta" className="text-2xl font-extrabold" style={{ color: palette.dark }}>Ready to see what the playbook could do for you?</h2>
            <p className="mt-2" style={{ color: palette.brown }}>Book a strategy call or request a free audit—your choice.</p>
            <div className="mt-4 flex gap-3">
              <a href="#contact" className="rounded-full px-6 py-3 font-extrabold border-2" style={{ borderColor: palette.orange, color: palette.dark, background: palette.mustard }}>Get Free Audit</a>
              <a href="#contact" className="rounded-full px-6 py-3 font-extrabold border-2" style={{ borderColor: palette.orange, color: 'white', background: palette.orange }}>Book Call</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
