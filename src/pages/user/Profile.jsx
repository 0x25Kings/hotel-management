import { Card, Input, Button } from '../../components/common/ui'
import { useAuth } from '../../context/AuthContext'
export default function Profile() {
  const { user } = useAuth()
  return <Card className="max-w-md space-y-3"><h1 className="text-xl font-semibold text-primary">Profile</h1>
    <Input label="Name" defaultValue={user.name} /><Input label="Phone number" defaultValue={user.phone} /><Input label="Email (read-only)" value={user.email} readOnly /><Input label="New password" type="password" />
    <p className="text-xs text-muted">Member since {user.created}. Role is managed by administrators.</p><Button onClick={() => alert('Saved (mock)')}>Save changes</Button></Card>
}
