'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`
    })
    if (error) {
      setError(error.message)
    } else {
      setMessage('Cek email untuk instruksi reset password.')
    }
  }

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold mb-6">Lupa Password</h1>
      <form onSubmit={handleReset} className="flex flex-col gap-4 max-w-sm">
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="bg-orange-600 text-white p-2 rounded hover:bg-orange-700">
          Kirim Link Reset
        </button>
      </form>
    </div>
  )
}
