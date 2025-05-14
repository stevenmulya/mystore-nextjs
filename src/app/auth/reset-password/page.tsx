'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert('Password updated successfully!')
      router.push('/login')
    }
  }

  return (
    <form onSubmit={handleReset} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Reset Password</h1>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  )
}
