const palette = { cream:'#F8F1E7', mustard:'#E2B036', orange:'#D16A1A', brown:'#4A311D', avocado:'#7BA16F', dark:'#191715' }

export default function Services() {
  return (
    <div className="min-h-screen" style={{ background: palette.cream }}>
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold" style={{ color: palette.dark }}>Services</h1>
        <p className="mt-4 max-w-3xl" style={{ color: palette.brown }}>A robust mix of strategy, creative, and media engineered for revenue impact. Below are example packages and capabilities.</p>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["SEO","Paid Media","Lifecycle Email","Content Engine","Brand Strategy","Analytics"].map((s,i)=> (
            <div key={i} className="rounded-2xl p-6 border-2" style={{ borderColor: palette.orange, background: 'white' }}>
              <p className="font-bold" style={{ color: palette.dark }}>{s}</p>
              <ul className="mt-2 text-sm list-disc pl-5" style={{ color: palette.brown }}>
                <li>Playbook-driven execution</li>
                <li>Weekly reporting & insights</li>
                <li>Roadmaps and milestones</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
