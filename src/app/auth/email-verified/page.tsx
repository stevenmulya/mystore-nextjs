// src/app/auth/email-verified/page.tsx
"use client";

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';

function EmailVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type');

    if (token_hash && type === 'email') {
      supabase.auth.verifyOtp({
        type: 'email',
        token_hash: token_hash
      })
      .then(({ error }) => {
        if (error) {
          console.error('Verification error:', error.message);
          router.push('/auth/verification-error');
        } else {
          router.push('/dashboard');
        }
      });
    }
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Verifying Email...</h1>
        <p>Please wait while we verify your email address.</p>
      </div>
    </div>
  );
}

export default function EmailVerifiedPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    }>
      <EmailVerificationContent />
    </Suspense>
  );
}