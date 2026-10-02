import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button, Card, Input } from '../../components/common/ui'
export default function Register() {
  const { register } = useAuth(); const nav = useNavigate()
  const [f, setF] = useState({ first:'', last:'', email:'', phone:'', password:'', confirm:'', terms:false }); const [e, setE] = useState({})
  const set = k => ev => setF({ ...f, [k]: ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value })
  const submit = async ev => { ev.preventDefault()
    const x = {}; if (!f.first) x.first = 'Required'; if (!f.email.includes('@')) x.email = 'Invalid email'
    if (f.password.length < 8) x.password = 'At least 8 characters'; if (f.confirm !== f.password) x.confirm = 'Passwords do not match'; if (!f.terms) x.terms = 'Accept the terms'
    setE(x); if (Object.keys(x).length) return; await register(f); nav('/dashboard') }
  return <div className="min-h-screen flex items-center justify-center p-4"><Card className="w-full max-w-md"><h1 className="text-xl font-semibold text-primary mb-4">Create account</h1>
    <form onSubmit={submit} className="space-y-3"><div className="grid grid-cols-2 gap-3"><Input label="First name" error={e.first} onChange={set('first')} /><Input label="Last name" onChange={set('last')} /></div>
      <Input label="Email" error={e.email} onChange={set('email')} /><Input label="Phone number" onChange={set('phone')} />
      <Input label="Password" type="password" error={e.password} onChange={set('password')} /><Input label="Confirm password" type="password" error={e.confirm} onChange={set('confirm')} />
      <label className="text-sm flex gap-2"><input type="checkbox" onChange={set('terms')} /> I accept the terms and conditions</label>{e.terms && <p className="text-bad text-xs">{e.terms}</p>}
      <Button className="w-full">Register</Button></form><p className="text-sm mt-4 text-muted">Have an account? <Link className="text-primary underline" to="/login">Login</Link></p></Card></div>
}
