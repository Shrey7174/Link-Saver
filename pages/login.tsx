// pages/login.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import AuthLayout from '../components/AuthLayout';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) router.push('/');
      else setLoading(false);
    };
    checkUser();

    // Clear credentials when component unmounts (optional but clean)
    return () => {
      setEmail('');
      setPassword('');
    };
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) setError(error.message);
    else {
      setEmail('');
      setPassword('');
      router.push('/');
    }
  };

  return (
    <AuthLayout>
      {!loading && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
          <form onSubmit={handleLogin} autoComplete="off">
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="new-email"
              required
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              required
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Login
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          <p className="text-sm mt-4 text-center">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  );
}
