'use client'

import Link from 'next/link'

// TODO: replace with real data fetched from GET /journey/stage/3/analysis/:userId
const placeholderOS = {
  corePrinciple: 'Build the floor before you reach for the ceiling.',
  mindsetReframe:
    'Money is not a scoreboard — it is a tool. Your job is to direct it with intention, not chase it with anxiety.',
  monthlyTargets: [
    { label: 'Savings Rate', target: '25%', current: '20%' },
    { label: 'Emergency Fund', target: '£500 added', current: '£0' },
    { label: 'Debt Overpayment', target: '£200 extra', current: '£0' },
  ],
  weeklyActions: [
    'Every Sunday: spend 10 minutes reviewing last week\'s transactions',
    'Every payday: transfer savings before touching anything else',
    'Every Friday: rate your financial discipline 1–10 in your Finops check-in',
  ],
  ninetyDayFocus:
    'Reach 3 months of runway. This single target changes everything — it removes the anxiety that drives bad decisions.',
}

export default function Stage3Page() {
  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <div className="h-1 bg-stone-800">
        <div className="h-full bg-white w-3/4" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16 space-y-12">
        <div className="space-y-3">
          <p className="text-sm text-stone-500">Stage 3 of 4 — Your Operating System</p>
          <h1 className="text-3xl font-bold">Your personalised financial OS.</h1>
          <p className="text-stone-400">
            Built on your reality. Designed to install a new way of relating to money.
          </p>
        </div>

        {/* Core principle */}
        <div className="bg-stone-900 rounded-2xl p-8 space-y-3">
          <p className="text-xs font-medium tracking-widest text-stone-500 uppercase">
            Core Principle
          </p>
          <p className="text-2xl font-semibold leading-snug">{placeholderOS.corePrinciple}</p>
        </div>

        {/* Mindset reframe */}
        <div className="border border-stone-700 rounded-2xl p-8 space-y-3">
          <p className="text-xs font-medium tracking-widest text-stone-500 uppercase">
            Mindset Reframe
          </p>
          <p className="text-stone-200 leading-relaxed">{placeholderOS.mindsetReframe}</p>
        </div>

        {/* Monthly targets */}
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-widest text-stone-500 uppercase">
            Monthly Targets
          </p>
          <div className="space-y-3">
            {placeholderOS.monthlyTargets.map((t) => (
              <div key={t.label} className="bg-stone-900 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{t.label}</p>
                  <p className="text-sm text-stone-500">Currently: {t.current}</p>
                </div>
                <p className="text-lg font-semibold text-white">{t.target}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly actions */}
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-widest text-stone-500 uppercase">
            Weekly Habits
          </p>
          <div className="space-y-3">
            {placeholderOS.weeklyActions.map((action, i) => (
              <div key={i} className="flex gap-4 bg-stone-900 rounded-xl p-4">
                <span className="text-stone-600 font-mono text-sm mt-0.5">{i + 1}.</span>
                <p className="text-stone-200 text-sm leading-relaxed">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 90-day focus */}
        <div className="bg-white text-stone-950 rounded-2xl p-8 space-y-3">
          <p className="text-xs font-medium tracking-widest text-stone-700 uppercase">
            90-Day Focus
          </p>
          <p className="font-semibold leading-relaxed">{placeholderOS.ninetyDayFocus}</p>
        </div>

        <Link
          href="/journey/stage-4"
          className="block w-full text-center bg-white text-stone-950 font-semibold px-8 py-4 rounded-full hover:bg-stone-100 transition-colors"
        >
          I&apos;m Ready to Commit
        </Link>
      </div>
    </div>
  )
}
