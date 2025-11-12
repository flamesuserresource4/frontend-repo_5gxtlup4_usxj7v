const palette = { cream:'#F8F1E7', mustard:'#E2B036', orange:'#D16A1A', brown:'#4A311D', avocado:'#7BA16F', dark:'#191715' }

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: palette.cream }}>
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold" style={{ color: palette.dark }}>About Running With Strategy</h1>
        <p className="mt-4 max-w-3xl" style={{ color: palette.brown }}>
          We mix rigorous strategy, creative craftsmanship, and a revenue-first mindset. Founded to bring clarity to noisy growth, we build operating systems that compound.
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {["Strategy","Creative","Media"].map((h,i)=> (
            <div key={i} className="rounded-2xl p-6 border-2" style={{ borderColor: palette.mustard, background: 'white' }}>
              <p className="font-bold" style={{ color: palette.dark }}>{h}</p>
              <p className="text-sm mt-2" style={{ color: palette.brown }}>Decisions grounded in data, executed with taste, and measured against revenue.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
