'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CallbackPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const type = searchParams.get('type')
      const accessToken = searchParams.get('access_token')

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error || !session?.user) {
        console.error('Session error:', error)
        return
      }

      const user = session.user

      // ✅ Recovery / Forgot Password
      if (type === 'recovery') {
        router.push('/auth/reset-password')
        return
      }

      // ✅ Sign Up / Email Verified
      if (type === 'signup' || user.email_confirmed_at || user.confirmed_at) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (!profile) {
          await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
          })
        }

        router.push('/email-verified')
      }
    }

    handleAuth()
  }, [searchParams, router])

  return <div className="p-4 text-center">Verifying your account...</div>
}
