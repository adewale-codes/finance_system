from dataclasses import dataclass


@dataclass
class FinancialSnapshot:
    monthly_income: float
    monthly_expenses: float
    total_savings: float
    total_debt: float
    monthly_debt_payments: float


@dataclass
class FinancialMetrics:
    savings_rate: float           # percentage
    debt_to_income_ratio: float   # ratio (0–1+)
    months_of_runway: float       # months expenses covered by savings
    net_worth: float              # savings minus debt
    financial_health_score: float # composite 0–100


def calculate_metrics(snapshot: FinancialSnapshot) -> FinancialMetrics:
    income = snapshot.monthly_income
    expenses = snapshot.monthly_expenses

    net_monthly = income - expenses
    savings_rate = (net_monthly / income * 100) if income > 0 else 0.0
    debt_to_income = (snapshot.monthly_debt_payments / income) if income > 0 else 0.0
    months_of_runway = (snapshot.total_savings / expenses) if expenses > 0 else 0.0
    net_worth = snapshot.total_savings - snapshot.total_debt

    # Composite score — three equal-ish pillars
    savings_pts = min(savings_rate, 30) / 30 * 40          # 40 pts: target 30% savings rate
    debt_pts = (1 - min(debt_to_income, 1)) * 30           # 30 pts: lower debt payments = better
    runway_pts = min(months_of_runway, 6) / 6 * 30         # 30 pts: target 6-month runway
    score = max(0.0, min(100.0, savings_pts + debt_pts + runway_pts))

    return FinancialMetrics(
        savings_rate=round(savings_rate, 2),
        debt_to_income_ratio=round(debt_to_income, 4),
        months_of_runway=round(months_of_runway, 1),
        net_worth=round(net_worth, 2),
        financial_health_score=round(score, 1),
    )
