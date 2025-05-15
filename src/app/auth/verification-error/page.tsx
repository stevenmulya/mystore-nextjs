"use client";

import Link from 'next/link';

export default function VerificationError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="mt-3 text-2xl font-bold text-gray-900">
          Email Verification Failed
        </h2>
        <div className="mt-4 text-gray-600 space-y-2">
          <p>The verification link is invalid or has expired.</p>
          <p>Please request a new verification email.</p>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-4">
          <Link
            href="/auth/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Login
          </Link>
          
          <Link
            href="/auth/register"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Account
          </Link>

          <div className="text-sm">
            <Link 
              href="/auth/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}