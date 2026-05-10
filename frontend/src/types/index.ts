export interface User {
  id: string
  email: string
  full_name: string | null
  is_admin: boolean
  journey_completed: boolean
  created_at: string
}

export interface FinancialSnapshot {
  id: string
  user_id: string
  monthly_income: number
  monthly_expenses: number
  total_savings: number
  total_debt: number
  monthly_debt_payments: number
  savings_rate: number
  debt_to_income_ratio: number
  months_of_runway: number
  net_worth: number
  financial_health_score: number
  mirror_narrative: string | null
  created_at: string
}

export interface OperatingSystem {
  id: string
  user_id: string
  core_principle: string
  monthly_targets: Record<string, string>
  weekly_actions: string[]
  mindset_reframe: string
  ninety_day_focus: string
  version: number
  created_at: string
  updated_at: string
}

export interface CheckIn {
  id: string
  user_id: string
  mood_score: number
  financial_stress_score: number
  notes: string | null
  ai_insight: string | null
  created_at: string
}

export interface CheckInStreak {
  user_id: string
  current_streak: number
  longest_streak: number
  total_checkins: number
}

export interface AdminStats {
  total_users: number
  active_users_7d: number
  journeys_completed: number
  checkins_today: number
}
