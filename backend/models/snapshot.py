from datetime import datetime
from typing import Any

from pydantic import BaseModel


class FinancialSnapshotCreate(BaseModel):
    user_id: str
    monthly_income: float
    monthly_expenses: float
    total_savings: float
    total_debt: float
    monthly_debt_payments: float
    raw_stage_data: dict[str, Any] = {}


class FinancialSnapshot(FinancialSnapshotCreate):
    id: str
    savings_rate: float
    debt_to_income_ratio: float
    months_of_runway: float
    net_worth: float
    financial_health_score: float
    mirror_narrative: str | None
    created_at: datetime

    model_config = {"from_attributes": True}
