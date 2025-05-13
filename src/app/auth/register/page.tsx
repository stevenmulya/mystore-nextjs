'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      // Jangan langsung push ke dashboard, tunggu verifikasi email
      // Bisa arahkan ke halaman informasi verifikasi jika ingin
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Daftar Akun</h2>

        {success && (
          <p className="text-green-600 text-sm text-center mb-4">
            Link verifikasi telah dikirim ke email kamu.
            Silakan cek inbox dan verifikasi untuk melanjutkan.
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password (min. 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Sudah punya akun?{' '}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Masuk
          </a>
        </p>
      </div>
    </div>
  )
}
