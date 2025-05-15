"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function EmailVerified() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token_hash || type !== 'email') {
        router.push('/auth/verification-error');
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          type: 'email',
          token_hash,
        });

        if (error) throw error;

        // Optional: Update user metadata or perform post-verification logic
        await supabase.auth.updateUser({
          data: { email_verified: true },
        });

      } catch (error) {
        console.error('Email verification error:', error);
        router.push('/auth/verification-error');
      }
    };

    verifyEmail();
  }, [router, token_hash, type]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Email Verified Successfully!
          </h2>
          <p className="mt-2 text-gray-600">
            Your email address has been successfully verified.
          </p>
        </div>

        <div className="mt-6">
          <Link
            href="/dashboard"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Dashboard
          </Link>
        </div>

        <div className="mt-4 text-sm text-center">
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Or return to login
          </Link>
        </div>
      </div>
    </div>
  );
}