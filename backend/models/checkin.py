from datetime import datetime

from pydantic import BaseModel, Field


class CheckInCreate(BaseModel):
    user_id: str
    mood_score: int = Field(..., ge=1, le=10)
    financial_stress_score: int = Field(..., ge=1, le=10)
    notes: str | None = None


class CheckIn(CheckInCreate):
    id: str
    ai_insight: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class CheckInStreak(BaseModel):
    user_id: str
    current_streak: int
    longest_streak: int
    total_checkins: int
