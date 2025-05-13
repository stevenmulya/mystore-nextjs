'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to MyStore 🛒</h1>
      <p className="text-gray-600 mb-6">Belanja mudah dan terpercaya.</p>

      <div className="flex justify-center gap-4">
        <Link
          href="/auth/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Daftar
        </Link>
      </div>
    </div>
  )
}
