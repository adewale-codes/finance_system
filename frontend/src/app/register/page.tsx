'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-stone-950 text-white px-4">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="space-y-1">
            <p className="text-sm font-medium tracking-widest text-stone-400 uppercase">
              Financial Operating System
            </p>
            <h1 className="text-4xl font-bold tracking-tight">Finops</h1>
          </div>
          <div className="bg-stone-900 rounded-2xl p-6 space-y-3">
            <p className="text-lg font-semibold">Almost there</p>
            <p className="text-stone-400 text-sm leading-relaxed">
              Check your email to confirm your account before logging in.
            </p>
          </div>
          <Link
            href="/login"
            className="block text-stone-400 text-sm hover:text-white transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-stone-950 text-white px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-1">
          <p className="text-sm font-medium tracking-widest text-stone-400 uppercase">
            Financial Operating System
          </p>
          <h1 className="text-4xl font-bold tracking-tight">Finops</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-stone-300">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-stone-400 transition-colors"
              placeholder="Jane Smith"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-stone-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-stone-400 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-stone-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-stone-400 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-300">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-stone-400 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-stone-950 font-semibold px-8 py-4 rounded-full hover:bg-stone-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-stone-400 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-white underline underline-offset-4 hover:text-stone-200 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
