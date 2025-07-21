import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/../lib/supabaseClient';
import AuthLayout from '../components/AuthLayout';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      router.push('/');
    }
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.push('/');
    });
  }, []);

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form onSubmit={handleSignup} autoComplete="off">
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          name="user_password"
          placeholder="Password"
          autoComplete="new-password"
          className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          name="user_confirm_password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Sign Up
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      <p className="text-sm mt-4 text-center">
        Already have an account?{' '}
        <Link href="/login" className="text-green-600 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
