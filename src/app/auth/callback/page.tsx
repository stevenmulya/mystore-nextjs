// app/auth/callback/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCallback() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const type = searchParams.get('type')
    const access_token = searchParams.get('access_token')

    if (type === 'recovery' && access_token) {
      // Supabase automatically sets the session
      router.replace('/reset-password')
    } else {
      supabase.auth
        .getSession()
        .then(({ data: { session } }) => {
          if (session) {
            router.replace('/dashboard')
          } else {
            router.replace('/auth/login')
          }
        })
        .finally(() => setLoading(false))
    }
  }, [router, supabase, searchParams])

  return <p className="text-center mt-10">Verifying your account...</p>
}
