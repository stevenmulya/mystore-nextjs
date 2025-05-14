'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CallbackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const type = searchParams.get('type')

    // Jika dari forgot password (recovery), set session secara manual
    if (type === 'recovery' && accessToken && refreshToken) {
      supabase.auth
        .setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .then(() => {
          router.push('/reset-password')
        })
        .catch((err) => {
          console.error('Error setting session:', err)
          router.push('/login')
        })
    } else {
      // Untuk login biasa
      router.push('/dashboard')
    }
  }, [searchParams, router, supabase])

  return <p>Verifying your account...</p>
}
