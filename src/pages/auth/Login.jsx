import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button, Card, Input } from '../../components/common/ui'
export default function Login() {
  const { login } = useAuth(); const nav = useNavigate()
  const [f, setF] = useState({ email: '', password: '' }); const [err, setErr] = useState('')
  const submit = async e => { e.preventDefault(); try { const u = await login(f.email, f.password); nav(u.role === 'ADMIN' ? '/admin' : '/dashboard') } catch (x) { setErr(x.message) } }
  return <div className="min-h-screen flex items-center justify-center p-4"><Card className="w-full max-w-sm"><h1 className="text-xl font-semibold text-primary mb-1">Login</h1><p className="text-xs text-muted mb-4">Tip: use an email containing "admin" for the admin role.</p>
    <form onSubmit={submit} className="space-y-3">
      <Input label="Email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
      <Input label="Password" type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} />
      <label className="text-sm flex gap-2"><input type="checkbox" /> Remember me</label>
      {err && <p className="text-bad text-sm">{err}</p>}
      <Button className="w-full">Login</Button></form>
    <p className="text-sm mt-4 text-muted">No account? <Link className="text-primary underline" to="/register">Register</Link> · <a className="text-primary underline" href="#">Forgot password</a></p></Card></div>
}
