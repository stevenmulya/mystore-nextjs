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
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user) return

      const user = session.user

      if (type === 'recovery') {
        router.push('/auth/reset-password')
        return
      }

      if (type === 'signup' || user.email_confirmed_at || user.confirmed_at) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (!profile && !error) {
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
