import dynamic from 'next/dynamic'

const AuthCallback = dynamic(() => import('@/components/AuthCallback'), {
  ssr: false,
})

export default function CallbackPage() {
  return <AuthCallback />
}
