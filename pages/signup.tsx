import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import AuthLayout from '../components/AuthLayout';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendEmailSent, setResendEmailSent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendCooldown > 0) {
        setResendCooldown((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  useEffect(() => {
    const checkVerification = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email_confirmed_at) {
        setMessage('Your email is verified. Please log in.');
      }
    };
    checkVerification();
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('User already registered')) {
        setError('Email already exists. Please log in.');
      } else {
        setError(error.message || 'An error occurred. Please try again.');
      }
    } else {
      setMessage('Verification email sent. Please check your inbox.');
      setResendEmailSent(true);
      setResendCooldown(30);
    }
  };

  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      setError(error.message || 'Failed to resend email.');
    } else {
      setMessage('Verification email resent. Please check your inbox.');
      setResendCooldown(30);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
      <form onSubmit={handleSignup} autoComplete="off">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Sign Up
        </button>
      </form>

      {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {resendEmailSent && (
        <p className="text-sm mt-2 text-center">
          Didn&apos;t get the email?{' '}
          <button
            type="button"
            onClick={handleResendEmail}
            disabled={resendCooldown > 0}
            className={`text-blue-600 hover:underline disabled:text-gray-400`}
          >
            Resend {resendCooldown > 0 && `(${resendCooldown}s)`}
          </button>
        </p>
      )}

      <p className="text-sm mt-4 text-center">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
