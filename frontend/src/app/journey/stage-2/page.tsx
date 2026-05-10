'use client'

import Link from 'next/link'

// TODO: replace with real data fetched from GET /journey/snapshot/:userId after stage 1 submission
const placeholderMetrics = {
  savingsRate: 20,
  debtToIncome: 0.11,
  monthsOfRunway: 1.8,
  netWorth: -3000,
  financialHealthScore: 52,
  mirrorNarrative: `You're working hard, but your money isn't working hard enough for you yet.
  With less than 2 months of runway, one unexpected expense could destabilise everything.
  Your debt payments are manageable, but your savings rate needs to grow significantly to build
  real security. The good news: your fundamentals are fixable — and you already know what's true.`,
}

function ScoreRing({ score }: { score: number }) {
  const colour =
    score >= 70 ? 'text-green-400' : score >= 40 ? 'text-yellow-400' : 'text-red-400'
  return (
    <div className={`text-6xl font-bold ${colour}`}>
      {score}
      <span className="text-2xl text-stone-500">/100</span>
    </div>
  )
}

function Metric({ label, value, context }: { label: string; value: string; context: string }) {
  return (
    <div className="bg-stone-900 rounded-xl p-5 space-y-1">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-stone-400">{context}</p>
    </div>
  )
}

export default function Stage2Page() {
  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <div className="h-1 bg-stone-800">
        <div className="h-full bg-white w-1/2" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16 space-y-12">
        <div className="space-y-3">
          <p className="text-sm text-stone-500">Stage 2 of 4 — The Mirror</p>
          <h1 className="text-3xl font-bold">Here is your financial reality.</h1>
          <p className="text-stone-400">
            This is not a judgement. This is the truth — and you need it.
          </p>
        </div>

        {/* Health score */}
        <div className="bg-stone-900 rounded-2xl p-8 text-center space-y-2">
          <p className="text-stone-400">Financial Health Score</p>
          <ScoreRing score={placeholderMetrics.financialHealthScore} />
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Metric
            label="Savings Rate"
            value={`${placeholderMetrics.savingsRate}%`}
            context="Target: 20%+"
          />
          <Metric
            label="Months of Runway"
            value={`${placeholderMetrics.monthsOfRunway}`}
            context="Target: 3–6 months"
          />
          <Metric
            label="Debt-to-Income"
            value={`${(placeholderMetrics.debtToIncome * 100).toFixed(0)}%`}
            context="Target: under 15%"
          />
          <Metric
            label="Net Worth"
            value={`£${placeholderMetrics.netWorth.toLocaleString()}`}
            context="Assets minus liabilities"
          />
        </div>

        {/* AI narrative */}
        <div className="border border-stone-700 rounded-2xl p-8 space-y-4">
          <p className="text-xs font-medium tracking-widest text-stone-500 uppercase">
            Your Financial Mirror
          </p>
          <p className="text-stone-200 leading-relaxed whitespace-pre-line">
            {placeholderMetrics.mirrorNarrative}
          </p>
        </div>

        <Link
          href="/journey/stage-3"
          className="block w-full text-center bg-white text-stone-950 font-semibold px-8 py-4 rounded-full hover:bg-stone-100 transition-colors"
        >
          Build My Operating System
        </Link>
      </div>
    </div>
  )
}
