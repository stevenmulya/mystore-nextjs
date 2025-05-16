'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const isPasswordValid = (password: string) => {
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(password)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok.')
      return
    }

    if (!isPasswordValid(password)) {
      setError('Password harus memiliki minimal 8 karakter, mengandung huruf, angka, dan simbol.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          address, // menyimpan alamat di user metadata
        },
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow text-center">
        <h1 className="text-xl font-semibold mb-4">Verifikasi Email</h1>
        <p>
          Kami telah mengirimkan email verifikasi ke <strong>{email}</strong>.
        </p>
        <p>Silakan periksa email dan klik link verifikasi untuk mengaktifkan akun Anda.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Daftar Akun</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 px-2 text-sm text-gray-600"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <input
          type="password"
          placeholder="Konfirmasi Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Alamat"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <p className="text-sm text-gray-600">
          * Password minimal 8 karakter dan harus mengandung huruf, angka, serta simbol.
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Mendaftar...' : 'Daftar'}
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        Sudah punya akun?{' '}
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
