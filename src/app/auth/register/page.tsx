'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Cek email kamu untuk verifikasi.')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <input className="border p-2 w-full mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className="border p-2 w-full mb-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleRegister} className="bg-blue-500 text-white p-2 rounded w-full">Daftar</button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  )
}
