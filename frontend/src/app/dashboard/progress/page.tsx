// TODO: fetch real data from GET /checkin/history/:userId

const placeholderCheckins = [
  { date: '2026-05-04', mood: 7, stress: 6, insight: 'Your mood is trending up — keep the momentum.' },
  { date: '2026-05-03', mood: 5, stress: 7, insight: 'High stress day. Notice the pattern and plan around it.' },
  { date: '2026-05-02', mood: 8, stress: 4, insight: 'Strong day. What made it work?' },
]

const placeholderStats = {
  avgMood: 6.7,
  avgStress: 5.7,
  totalCheckins: 3,
  currentStreak: 3,
  scoreHistory: [48, 50, 52],
}

function TrendChart({ values, label }: { values: number[]; label: string }) {
  const max = 10
  return (
    <div className="space-y-2">
      <p className="text-xs text-stone-500">{label}</p>
      <div className="flex items-end gap-1 h-16">
        {values.map((v, i) => (
          <div
            key={i}
            className="flex-1 bg-stone-700 rounded-sm"
            style={{ height: `${(v / max) * 100}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ProgressPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Your Progress</h1>
        <p className="text-stone-400">Tracking your financial wellbeing over time.</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-stone-900 rounded-xl p-5">
          <p className="text-3xl font-bold">{placeholderStats.currentStreak}</p>
          <p className="text-xs text-stone-500 mt-1">Day Streak</p>
        </div>
        <div className="bg-stone-900 rounded-xl p-5">
          <p className="text-3xl font-bold">{placeholderStats.totalCheckins}</p>
          <p className="text-xs text-stone-500 mt-1">Total Check-Ins</p>
        </div>
        <div className="bg-stone-900 rounded-xl p-5">
          <p className="text-3xl font-bold">{placeholderStats.avgMood}</p>
          <p className="text-xs text-stone-500 mt-1">Avg Mood (7 days)</p>
        </div>
        <div className="bg-stone-900 rounded-xl p-5">
          <p className="text-3xl font-bold">{placeholderStats.avgStress}</p>
          <p className="text-xs text-stone-500 mt-1">Avg Stress (7 days)</p>
        </div>
      </div>

      {/* Trend charts */}
      <div className="bg-stone-900 rounded-2xl p-6 grid grid-cols-2 gap-8">
        <TrendChart
          values={placeholderCheckins.map((c) => c.mood)}
          label="Mood trend"
        />
        <TrendChart
          values={placeholderCheckins.map((c) => 10 - c.stress)}
          label="Calm trend (inverse of stress)"
        />
      </div>

      {/* Recent check-ins */}
      <div className="space-y-4">
        <h2 className="font-semibold text-stone-300">Recent Check-Ins</h2>
        {placeholderCheckins.map((checkin) => (
          <div key={checkin.date} className="bg-stone-900 rounded-xl p-5 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-stone-500">{checkin.date}</p>
              <div className="flex gap-3 text-sm">
                <span>Mood: <strong>{checkin.mood}</strong></span>
                <span>Stress: <strong>{checkin.stress}</strong></span>
              </div>
            </div>
            {checkin.insight && (
              <p className="text-sm text-stone-400 italic">{checkin.insight}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
