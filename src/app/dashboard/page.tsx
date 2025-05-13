'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/auth-helpers-nextjs'

export default function DashboardPage() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
      } else if (!user.email_confirmed_at) {
        alert('Email belum diverifikasi. Silakan cek email Anda.')
        await supabase.auth.signOut()
        router.push('/auth/login')
      } else {
        setUser(user)
        setLoading(false)
      }
    }

    getUser()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (loading) return <p className="text-center mt-10">Memuat...</p>

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Halo, {user?.email} 👋</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  )
}
