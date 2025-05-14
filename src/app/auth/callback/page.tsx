import dynamic from 'next/dynamic'

// Komponen ini akan dipanggil secara client-side saja
const CallbackHandler = dynamic(() => import('@/components/CallbackHandler'), {
  ssr: false
})

export default function CallbackPage() {
  return <CallbackHandler />
}
