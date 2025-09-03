import { useState } from "react"
import { useLocation, useNavigate, link } from "react-router-dom"
import Button from "../components/Button"
import Card from "../components/Card"
import useAuth from "../hooks/useAuth"

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { register } = useAuth()
    const navigate = useNavigate()

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value})

    const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try { 
        await register(form); 
        navigate('/events', { replace: true }) 
    } catch (err) { setError(err?.message || 'No se pudo iniciar sesión.') }
    finally { setLoading(false) }
  }

  return (
    <div className="mas-w-md mx-auto">
        <Card>
            <h1 className="text-2xl font-semibold mb-2">Crea tu cuenta</h1>
            <p className="opacity-80 mb-6">Regístrate para organizar o comprar entradas.</p>

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="label">Nombre</label>
                    <input className="input" name="name" value={form.name} onChange={onChange}  required/>
                </div>
                <div>
                    <label className="label">Correo electrónico</label>
                    <input className="input" type="email" name="email" value={form.email} onChange={onChange}  required/>
                </div>
               <div>
                    <label className="label">Contraseña</label>
                    <input className="input" type="password" name="password" value={form.password} onChange={onChange}  required/>
                </div>
                <div>
                    <label className="label">Rol</label>
                    <select className="input" name="role" value={form.role} onChange={onChange}>
                        <option value="user">user</option>
                        <option value="organizer">organizer</option>
                        <option value="staff">staff</option>
                        <option value="admin">admin</option>
                    </select>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <Button disabled={loading}>{loading ? 'Creando...' : 'Entrar'}</Button>
            </form>
        </Card>
    </div>
  )
}