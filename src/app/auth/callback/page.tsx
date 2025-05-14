'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const type = searchParams.get('type') // e.g., "signup", "recovery"
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user) return

      const user = session.user

      if (type === 'recovery') {
        router.push('/auth/reset-password')
        return
      }

      // Verifikasi email selesai
      if (type === 'signup' || user.email_confirmed_at || user.confirmed_at) {
        // Tambah ke table profiles jika belum
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

        router.push('/email-verified')
      }
    }

    handleAuthRedirect()
  }, [router, searchParams])

  return (
    <div className="p-6 text-center">
      <p className="text-lg font-medium">Memproses akun Anda...</p>
    </div>
  )
}
