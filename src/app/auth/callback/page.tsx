'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const verifyAndCreateUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user) return

      const user = session.user

      // Cek apakah email sudah dikonfirmasi
      if (user.email_confirmed_at || user.confirmed_at) {
        // Tambahkan user ke tabel `profiles` jika belum ada
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (!profile && !profileError) {
          await supabase.from('profiles').insert({
            id: user.id,
            email: user.email
          })
        }

        router.push('/') // Redirect ke home atau dashboard
      }
    }

    verifyAndCreateUser()
  }, [router])

  return (
    <div className="p-4">
      <h1>Memverifikasi akun...</h1>
    </div>
  )
}
