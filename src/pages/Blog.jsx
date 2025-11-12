const palette = { cream:'#F8F1E7', mustard:'#E2B036', orange:'#D16A1A', brown:'#4A311D', avocado:'#7BA16F', dark:'#191715' }

export default function Blog() {
  const posts = new Array(6).fill(0).map((_,i)=> ({
    title:`How to Scale Creatives ${i+1}`,
    excerpt:'A practical framework for testing messaging and production cadence.',
    date:'2024-08-0'+((i%9)+1),
  }))
  return (
    <div className="min-h-screen" style={{ background: palette.cream }}>
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold" style={{ color: palette.dark }}>Blog</h1>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p,i)=> (
            <article key={i} className="rounded-2xl p-6 border-2" style={{ borderColor: palette.brown, background: 'white' }}>
              <p className="text-xs font-bold" style={{ color: palette.orange }}>{p.date}</p>
              <h3 className="text-xl font-extrabold mt-1" style={{ color: palette.dark }}>{p.title}</h3>
              <p className="text-sm mt-2" style={{ color: palette.brown }}>{p.excerpt}</p>
              <button className="mt-4 rounded-full px-4 py-2 font-extrabold" style={{ background: palette.mustard, color: palette.dark }}>Read</button>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
