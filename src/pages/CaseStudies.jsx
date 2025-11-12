const palette = { cream:'#F8F1E7', mustard:'#E2B036', orange:'#D16A1A', brown:'#4A311D', avocado:'#7BA16F', dark:'#191715' }

export default function CaseStudies() {
  const cases = [
    { client:'CPG Brand', result:'+120% revenue in 90 days', video:'https://www.w3schools.com/html/mov_bbb.mp4' },
    { client:'B2B SaaS', result:'CAC -35% with lifecycle overhaul', video:'https://www.w3schools.com/html/movie.mp4' },
  ]
  return (
    <div className="min-h-screen" style={{ background: palette.cream }}>
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold" style={{ color: palette.dark }}>Case Studies</h1>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {cases.map((c,i)=> (
            <div key={i} className="rounded-2xl p-6 border-2" style={{ borderColor: palette.avocado, background: 'white' }}>
              <h3 className="text-xl font-extrabold" style={{ color: palette.dark }}>{c.client}</h3>
              <p className="text-sm mt-1" style={{ color: palette.brown }}>{c.result}</p>
              <div className="mt-4 rounded-xl overflow-hidden border" style={{ borderColor: palette.brown }}>
                <video controls className="w-full h-56 object-cover">
                  <source src={c.video} type="video/mp4" />
                </video>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
