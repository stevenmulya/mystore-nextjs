'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const checkAdmin = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        router.push('/auth/login')
        return
      }

      const role = data.user.user_metadata?.role
      if (role !== 'admin') {
        router.push('/dashboard')
        return
      }

      setUserEmail(data.user.email ?? null) // ← perbaikan di sini
      setLoading(false)
    }

    checkAdmin()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (loading) return <p className="text-center mt-10">Loading admin panel...</p>

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Admin Panel</h1>
      <p className="mb-6 text-gray-700">
        Selamat datang admin, <strong>{userEmail}</strong>!
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  )
}
