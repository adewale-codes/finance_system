'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const questions = [
  {
    id: 'monthly_income',
    label: 'What is your total monthly take-home income?',
    type: 'number',
    prefix: '£',
    placeholder: '3,500',
  },
  {
    id: 'monthly_expenses',
    label: 'What do you estimate your total monthly expenses are?',
    type: 'number',
    prefix: '£',
    placeholder: '2,800',
  },
  {
    id: 'total_savings',
    label: 'How much do you have in savings right now?',
    type: 'number',
    prefix: '£',
    placeholder: '5,000',
  },
  {
    id: 'total_debt',
    label: 'What is your total debt (excluding mortgage)?',
    type: 'number',
    prefix: '£',
    placeholder: '8,000',
  },
  {
    id: 'monthly_debt_payments',
    label: 'How much do you pay toward debt each month?',
    type: 'number',
    prefix: '£',
    placeholder: '400',
  },
  {
    id: 'money_feeling',
    label: 'In one word, how does thinking about money make you feel?',
    type: 'text',
    placeholder: 'anxious, hopeful, confused...',
  },
]

export default function Stage1Page() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentQ, setCurrentQ] = useState(0)

  const question = questions[currentQ]
  const isLast = currentQ === questions.length - 1
  const progress = ((currentQ + 1) / questions.length) * 100

  function handleNext() {
    if (isLast) {
      // TODO: submit to API POST /journey/stage/1
      router.push('/journey/stage-2')
    } else {
      setCurrentQ((q) => q + 1)
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-stone-800">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl space-y-8">
          <div className="space-y-2">
            <p className="text-sm text-stone-500">
              Stage 1 of 4 — Reality Check &middot; {currentQ + 1} / {questions.length}
            </p>
            <h2 className="text-2xl font-semibold leading-snug">{question.label}</h2>
          </div>

          <div className="flex items-center gap-2 bg-stone-900 rounded-xl px-4 py-4">
            {question.prefix && (
              <span className="text-stone-400 text-lg">{question.prefix}</span>
            )}
            <input
              key={question.id}
              type={question.type}
              placeholder={question.placeholder}
              value={answers[question.id] ?? ''}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))
              }
              className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-stone-600"
              autoFocus
            />
          </div>

          <div className="flex justify-between">
            {currentQ > 0 ? (
              <button
                onClick={() => setCurrentQ((q) => q - 1)}
                className="text-stone-500 hover:text-white transition-colors"
              >
                Back
              </button>
            ) : (
              <span />
            )}
            <button
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="bg-white text-stone-950 font-semibold px-6 py-3 rounded-full hover:bg-stone-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isLast ? 'See My Reality' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
