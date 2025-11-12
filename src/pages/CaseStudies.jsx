const palette = { cream:'#F8F1E7', mustard:'#E2B036', orange:'#D16A1A', brown:'#4A311D', avocado:'#7BA16F', dark:'#191715' }

export default function CaseStudies() {
  const cases = [
    { client:'CPG Beverage', tag:'PERFORMANCE', metric:'+182% Revenue / 90d', desc:'Creative testing matrix + LTV-informed bidding + weekly CRO sprints.', video:'https://www.w3schools.com/html/mov_bbb.mp4', color:palette.orange },
    { client:'B2B SaaS', tag:'LIFECYCLE', metric:'-35% CAC', desc:'ICP refinement + onboarding flows + lead quality scoring.', video:'https://www.w3schools.com/html/movie.mp4', color:palette.mustard },
    { client:'Marketplace', tag:'ATTRIBUTION', metric:'3.2x ROAS at scale', desc:'MMM-informed budget allocation + audience expansion.', video:'https://www.w3schools.com/html/mov_bbb.mp4', color:palette.avocado },
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
            <h1 className="text-4xl sm:text-5xl font-extrabold" style={{ color: palette.dark }}>Case Studies</h1>
            <p className="mt-4 text-lg" style={{ color: palette.brown }}>A few snapshots of outcomes and how we achieved them. Full breakdowns below.</p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16" aria-labelledby="case-grid">
        <div className="container mx-auto px-6">
          <h2 id="case-grid" className="sr-only">Recent case studies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c,i)=> (
              <article key={i} className="rounded-2xl border-2 overflow-hidden lift-card bg-gradient-to-b from-white to-[#F8F1E7]" style={{ borderColor: c.color }}>
                <div className="p-6">
                  <div className="inline-block text-[10px] font-black tracking-wider px-3 py-1 rounded-full" style={{ background: c.color, color:'white' }}>{c.tag}</div>
                  <p className="mt-3 text-sm font-bold opacity-80" style={{ color: palette.brown }}>{c.client}</p>
                  <p className="mt-1 text-2xl font-extrabold" style={{ color: palette.dark }}>{c.metric}</p>
                  <p className="mt-2 text-sm" style={{ color: palette.brown }}>{c.desc}</p>
                </div>
                <div className="border-t" style={{ borderColor:'rgba(0,0,0,0.08)' }}>
                  <video controls className="w-full h-56 object-cover" preload="none" playsInline>
                    <source src={c.video} type="video/mp4" />
                  </video>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" aria-labelledby="case-cta" style={{ background: palette.dark }}>
        <div className="container mx-auto px-6">
          <div className="rounded-3xl p-8 border-2 glass-card" style={{ borderColor: palette.mustard }}>
            <h2 id="case-cta" className="text-2xl font-extrabold" style={{ color: palette.cream }}>Want a breakdown tailored to your brand?</h2>
            <p className="mt-2" style={{ color: '#C8BBAA' }}>We’ll audit your current setup and outline a path to revenue—free.</p>
            <a href="#contact" className="mt-4 inline-block rounded-full px-6 py-3 font-extrabold border-2" style={{ borderColor: palette.mustard, color: palette.dark, background: palette.mustard }}>Get Free Audit</a>
          </div>
        </div>
      </section>
    </main>
  )
}
