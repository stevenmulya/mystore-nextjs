'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const validatePassword = (pw: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    return regex.test(pw)
  }

  const handleRegister = async () => {
    setError(null)

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi tidak cocok.')
      return
    }

    if (!validatePassword(password)) {
      setError('Password harus minimal 8 karakter, mengandung huruf, angka, dan karakter khusus.')
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/auth/verify-email')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Buat Akun</h1>

      <input
        type="email"
        className="w-full border p-2 rounded mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full border p-2 rounded mb-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        className="w-full border p-2 rounded mb-2"
        placeholder="Konfirmasi Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Daftar
      </button>

      <p className="text-xs mt-2 text-gray-600">
        Password minimal 8 karakter, harus mengandung huruf, angka, dan simbol.
      </p>
    </div>
  )
}
