'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { Box, Flex, Heading, Button, Text } from '@radix-ui/themes';

export default function SignInPage() {
  const { data: status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  // Redirect authenticated users
  useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
      if (status === 'authenticated') {
      router.replace(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  // Focus email input on error
  useEffect(() => {
    if (error) {
      emailRef.current?.focus();
    }
  }, [error]);

  // Map NextAuth error codes to friendly messages
  const errorMessages: Record<string, string> = {
    CredentialsSignin: 'Invalid email or password.',
    OAuthAccountNotLinked: 'Please sign in with the same provider you used originally.',
    SessionRequired: 'You need to sign in to access this page.',
  };
  const queryError = errorParam ? errorMessages[errorParam] || errorParam : '';

  // Handle sign-in form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await signIn('credentials', {
      redirect: false,
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (res?.error) {
      setError(errorMessages[res.error] || res.error);
    } else if (res?.url) {
      router.replace(res.url);
    }
  };

  // Show loading state while session is being fetched
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
    if (status === 'loading') {
    return (
      <Flex align="center" justify="center" className="min-h-screen">
        <Text>Loading…</Text>
      </Flex>
    );
  }

  return (
    <Flex align="center" justify="center" className="min-h-screen">
      <Box className="shadow-md rounded-lg p-8 w-full max-w-md bg-gray-900">
        <Heading as="h2" size="4" className="text-2xl font-semibold text-blue-500 mb-6 text-center">
          Sign In
        </Heading>
        {queryError && <Text as="p" className="text-red-500 text-center mb-4">{queryError}</Text>}
        {error && <Text as="p" className="text-red-500 text-center mb-4">{error}</Text>}
        <form onSubmit={handleSubmit} className="space-y-6" aria-busy={isSubmitting}>
          <Box className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </Box>
          <Box className="mb-6">
            <label htmlFor="password" className="block text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={userInfo.password}
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </Box>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In…' : 'Sign In'}
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
