'use client'

import { Suspense } from 'react'
import CallbackPageContent from './content'

// 👇 Tambahkan ini agar tidak diprerender
export const dynamic = 'force-dynamic'

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Verifying...</div>}>
      <CallbackPageContent />
    </Suspense>
  )
}
