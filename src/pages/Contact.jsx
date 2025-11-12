import { useState } from 'react'

const palette = { cream:'#F8F1E7', mustard:'#E2B036', orange:'#D16A1A', brown:'#4A311D', avocado:'#7BA16F', dark:'#191715' }

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', company:'', revenue_goal:'' })
  const [status, setStatus] = useState({ state:'idle', message:'' })
  const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submitLead = async (e) => {
    e.preventDefault()
    setStatus({ state:'loading', message:'Submitting...' })
    try {
      const res = await fetch(`${backendBase}/leads`, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed')
      setStatus({ state:'success', message:'Thanks! We will reach out shortly.' })
      setForm({ name:'', email:'', company:'', revenue_goal:'' })
    } catch {
      setStatus({ state:'error', message:'Something went wrong. Please try again.' })
    }
  }

  return (
    <div className="min-h-screen" style={{ background: palette.cream }}>
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold" style={{ color: palette.dark }}>Contact Us</h1>
        <form onSubmit={submitLead} className="mt-8 max-w-2xl rounded-2xl p-6 border-2" style={{ borderColor: palette.mustard, background: 'white' }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold" style={{ color: palette.brown }}>Name</label>
              <input required value={form.name} onChange={(e)=>setForm({ ...form, name:e.target.value })} className="w-full rounded-lg px-3 py-2 border" style={{ borderColor: palette.mustard }} />
            </div>
            <div>
              <label className="text-sm font-bold" style={{ color: palette.brown }}>Email</label>
              <input required type="email" value={form.email} onChange={(e)=>setForm({ ...form, email:e.target.value })} className="w-full rounded-lg px-3 py-2 border" style={{ borderColor: palette.mustard }} />
            </div>
            <div>
              <label className="text-sm font-bold" style={{ color: palette.brown }}>Company</label>
              <input value={form.company} onChange={(e)=>setForm({ ...form, company:e.target.value })} className="w-full rounded-lg px-3 py-2 border" style={{ borderColor: palette.mustard }} />
            </div>
            <div>
              <label className="text-sm font-bold" style={{ color: palette.brown }}>Revenue Goal</label>
              <input value={form.revenue_goal} onChange={(e)=>setForm({ ...form, revenue_goal:e.target.value })} className="w-full rounded-lg px-3 py-2 border" style={{ borderColor: palette.mustard }} />
            </div>
          </div>
          <button type="submit" className="mt-6 rounded-full px-6 py-3 font-extrabold" style={{ background: palette.orange, color: 'white' }}>
            {status.state === 'loading' ? 'Sending...' : 'Send'}
          </button>
          {status.state !== 'idle' && (
            <p className="mt-3 text-sm" style={{ color: status.state === 'success' ? palette.avocado : palette.orange }}>{status.message}</p>
          )}
        </form>
      </div>
    </div>
  )
}
