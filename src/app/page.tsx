export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di MyStore</h1>
        <p className="text-gray-600 mb-6">Silakan login atau daftar untuk melanjutkan</p>
        <div className="space-x-4">
          <a href="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Login
          </a>
          <a href="/auth/register" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Daftar
          </a>
        </div>
      </div>
    </main>
  )
}
