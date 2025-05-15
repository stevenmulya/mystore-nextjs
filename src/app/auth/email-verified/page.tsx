// pages/auth/verify-email.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../../lib/supabase'

export default function EmailVerified() {
  const router = useRouter()

  useEffect(() => {
    const { token_hash, type } = router.query
    
    if (token_hash && type === 'email') {
      supabase.auth.verifyOtp({
        type: 'email',
        token_hash: token_hash as string
      })
      .then(({ error }) => {
        if (error) {
          // Handle error
        } else {
          // Redirect to success page
          router.push('/dashboard')
        }
      })
    }
  }, [router])

  return <div>Verifying email...</div>
}