'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

type BaselineSnapshot = {
  net_worth: number
  monthly_surplus: number
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [snapshot, setSnapshot] = useState<BaselineSnapshot | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      const { data } = await supabase
        .from('financial_snapshots')
        .select('net_worth, monthly_surplus, created_at')
        .eq('user_id', user.id)
        .eq('snapshot_type', 'baseline')
        .maybeSingle()

      setSnapshot(data)
      setLoading(false)
    }

    load()
  }, [router])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-stone-500 text-sm">Loading…</p>
      </div>
    )
  }

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? ''

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(n)

  const nextCheckIn = snapshot
    ? new Date(
        new Date(snapshot.created_at).getTime() + 30 * 24 * 60 * 60 * 1000
      ).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  if (!snapshot) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex justify-end p-4">
          <button
            onClick={handleSignOut}
            className="text-sm text-stone-500 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight">
                Your financial reality check is waiting
              </h1>
              <p className="text-stone-400">
                It takes 5 minutes. No jargon. Just your honest numbers.
              </p>
            </div>
            <Link
              href="/journey/stage-1"
              className="block w-full bg-white text-stone-950 font-semibold px-8 py-4 rounded-full hover:bg-stone-100 transition-colors text-lg"
            >
              Begin your reality check
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-stone-500 text-sm">Welcome back,</p>
          <h1 className="text-3xl font-bold">{displayName}</h1>
        </div>
        <button
          onClick={handleSignOut}
          className="text-sm text-stone-500 hover:text-white transition-colors mt-2"
        >
          Sign out
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-stone-900 rounded-xl p-5">
          <p className="text-xs text-stone-500 mb-1">Net Worth</p>
          <p className="text-2xl font-bold">{formatCurrency(snapshot.net_worth)}</p>
        </div>
        <div className="bg-stone-900 rounded-xl p-5">
          <p className="text-xs text-stone-500 mb-1">Monthly Surplus</p>
          <p className="text-2xl font-bold">{formatCurrency(snapshot.monthly_surplus)}</p>
        </div>
      </div>

      <div className="bg-stone-900 rounded-xl p-5">
        <p className="text-xs text-stone-500 mb-1">Next Check-In</p>
        <p className="font-semibold">{nextCheckIn}</p>
      </div>

      <Link
        href="/dashboard/checkin"
        className="block w-full text-center bg-white text-stone-950 font-semibold px-8 py-4 rounded-full hover:bg-stone-100 transition-colors"
      >
        Do Today&apos;s Check-In
      </Link>

      <Link
        href="/dashboard/progress"
        className="block w-full text-center border border-stone-700 text-stone-300 font-semibold px-8 py-4 rounded-full hover:border-stone-500 transition-colors"
      >
        View My Progress
      </Link>
    </div>
  )
}
