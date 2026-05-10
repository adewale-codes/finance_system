'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Stage4Page() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [committed, setCommitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleCommit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // TODO: call POST /auth/signup, then save journey data to the new account
    // Simulated delay
    await new Promise((r) => setTimeout(r, 1000))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <div className="h-1 bg-stone-800">
        <div className="h-full bg-white w-full" />
      </div>

      <div className="max-w-md mx-auto px-4 py-16 space-y-10">
        <div className="space-y-3">
          <p className="text-sm text-stone-500">Stage 4 of 4 — Commitment</p>
          <h1 className="text-3xl font-bold">Install your financial OS.</h1>
          <p className="text-stone-400">
            Create your account to save your operating system and begin tracking
            your progress every day.
          </p>
        </div>

        {/* Commitment pledge */}
        <label className="flex gap-4 bg-stone-900 rounded-2xl p-6 cursor-pointer">
          <input
            type="checkbox"
            checked={committed}
            onChange={(e) => setCommitted(e.target.checked)}
            className="mt-1 w-5 h-5 accent-white flex-shrink-0"
          />
          <p className="text-stone-300 leading-relaxed">
            I commit to checking in with my financial operating system daily and taking
            one concrete step toward my 90-day focus every week.
          </p>
        </label>

        {/* Account creation */}
        <form onSubmit={handleCommit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-stone-900 text-white rounded-xl px-4 py-4 outline-none placeholder:text-stone-600 focus:ring-1 focus:ring-stone-600"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-stone-900 text-white rounded-xl px-4 py-4 outline-none placeholder:text-stone-600 focus:ring-1 focus:ring-stone-600"
          />
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full bg-stone-900 text-white rounded-xl px-4 py-4 outline-none placeholder:text-stone-600 focus:ring-1 focus:ring-stone-600"
          />
          <button
            type="submit"
            disabled={!committed || !email || !password || !name || loading}
            className="w-full bg-white text-stone-950 font-semibold py-4 rounded-full hover:bg-stone-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating your account...' : 'Activate My Financial OS'}
          </button>
        </form>

        <p className="text-center text-sm text-stone-600">
          Already have an account?{' '}
          <a href="/dashboard" className="text-stone-400 hover:text-white">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
