'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession()

      if (session) {
        router.push('/')
      } else {
        console.error(error)
      }
    }

    getSession()
  }, [router])

  return (
    <div className="p-4">
      <h1>Verifying...</h1>
    </div>
  )
}
