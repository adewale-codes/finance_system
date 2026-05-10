'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function ScoreSlider({
  label,
  value,
  onChange,
  lowLabel,
  highLabel,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  lowLabel: string
  highLabel: string
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="font-medium">{label}</p>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-white"
      />
      <div className="flex justify-between text-xs text-stone-500">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  )
}

export default function CheckInPage() {
  const router = useRouter()
  const [mood, setMood] = useState(5)
  const [stress, setStress] = useState(5)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // TODO: call POST /checkin with { mood_score: mood, financial_stress_score: stress, notes }
    await new Promise((r) => setTimeout(r, 800))
    router.push('/dashboard')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-10">
      <div className="space-y-2">
        <p className="text-sm text-stone-500">Daily Check-In</p>
        <h1 className="text-3xl font-bold">How are you tracking today?</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-stone-900 rounded-2xl p-6 space-y-8">
          <ScoreSlider
            label="Overall mood"
            value={mood}
            onChange={setMood}
            lowLabel="Rough"
            highLabel="Great"
          />
          <ScoreSlider
            label="Financial stress"
            value={stress}
            onChange={setStress}
            lowLabel="Very stressed"
            highLabel="No stress"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-stone-400">
            Anything on your mind? (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="What happened with money today? Any wins, challenges, or observations..."
            className="w-full bg-stone-900 rounded-xl px-4 py-4 text-white outline-none placeholder:text-stone-600 resize-none focus:ring-1 focus:ring-stone-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-stone-950 font-semibold py-4 rounded-full hover:bg-stone-100 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Submit Check-In'}
        </button>
      </form>
    </div>
  )
}
