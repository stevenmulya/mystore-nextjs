'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CallbackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const type = searchParams.get('type')

  useEffect(() => {
    if (type === 'recovery') {
      router.push('/reset-password')
    } else {
      router.push('/dashboard')
    }
  }, [type, router])

  return <p>Verifying your account...</p>
}
