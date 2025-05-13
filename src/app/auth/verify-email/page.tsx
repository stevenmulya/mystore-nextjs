export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Verifikasi Email</h1>
        <p className="text-gray-700 mb-4">
          Kami telah mengirim email verifikasi ke alamat email kamu.
          <br />
          Silakan buka email kamu dan klik link verifikasinya.
        </p>
        <p className="text-sm text-gray-500">
          Setelah verifikasi, kamu bisa login ke dashboard.
        </p>
      </div>
    </div>
  )
}
