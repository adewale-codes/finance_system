from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from services.ai_service import analyse_checkin
from database.connection import get_supabase

router = APIRouter()


class CheckInRequest(BaseModel):
    user_id: str
    mood_score: int = Field(..., ge=1, le=10)
    financial_stress_score: int = Field(..., ge=1, le=10)
    notes: str | None = None


@router.post("/")
async def submit_checkin(checkin: CheckInRequest):
    supabase = get_supabase()

    # TODO: fetch last 5 check-ins for context
    history: list = []
    insight = await analyse_checkin(checkin.model_dump(), history)

    # TODO: insert into checkins table with insight
    return {
        "message": "Check-in recorded",
        "user_id": checkin.user_id,
        "insight": insight,
    }


@router.get("/history/{user_id}")
async def get_checkin_history(user_id: str, limit: int = 30):
    supabase = get_supabase()
    # TODO: fetch from checkins table ordered by created_at desc
    return {"user_id": user_id, "checkins": [], "total": 0}


@router.get("/streak/{user_id}")
async def get_streak(user_id: str):
    supabase = get_supabase()
    # TODO: compute streak from checkins table (consecutive days with a check-in)
    return {
        "user_id": user_id,
        "current_streak": 0,
        "longest_streak": 0,
        "total_checkins": 0,
    }
