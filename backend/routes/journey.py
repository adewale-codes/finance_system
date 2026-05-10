from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.calculator import FinancialSnapshot, calculate_metrics
from services.ai_service import generate_financial_mirror, generate_operating_system
from database.connection import get_supabase

router = APIRouter()


class StageSubmission(BaseModel):
    user_id: str
    stage: int
    data: dict[str, Any]


@router.post("/stage/{stage_number}")
async def submit_stage(stage_number: int, submission: StageSubmission):
    supabase = get_supabase()

    if stage_number == 1:
        # Calculate metrics from raw stage-1 data
        raw = submission.data
        fs = FinancialSnapshot(
            monthly_income=float(raw.get("monthly_income", 0)),
            monthly_expenses=float(raw.get("monthly_expenses", 0)),
            total_savings=float(raw.get("total_savings", 0)),
            total_debt=float(raw.get("total_debt", 0)),
            monthly_debt_payments=float(raw.get("monthly_debt_payments", 0)),
        )
        metrics = calculate_metrics(fs)

        # TODO: upsert into financial_snapshots table
        return {
            "stage": 1,
            "metrics": {
                "savings_rate": metrics.savings_rate,
                "debt_to_income_ratio": metrics.debt_to_income_ratio,
                "months_of_runway": metrics.months_of_runway,
                "net_worth": metrics.net_worth,
                "financial_health_score": metrics.financial_health_score,
            },
        }

    # For other stages, just persist the raw data
    return {"stage": stage_number, "message": "Stage data saved"}


@router.get("/snapshot/{user_id}")
async def get_snapshot(user_id: str):
    supabase = get_supabase()
    # TODO: fetch from financial_snapshots and operating_systems tables
    return {"user_id": user_id, "snapshot": None, "operating_system": None}


@router.get("/stage/2/analysis/{user_id}")
async def get_stage2_analysis(user_id: str):
    supabase = get_supabase()
    # TODO: fetch snapshot data from DB
    snapshot_data: dict = {}  # placeholder
    narrative = await generate_financial_mirror(snapshot_data)
    return {"user_id": user_id, "mirror_narrative": narrative}


@router.get("/stage/3/analysis/{user_id}")
async def get_stage3_analysis(user_id: str):
    supabase = get_supabase()
    # TODO: fetch snapshot + mirror narrative from DB
    snapshot_data: dict = {}
    mirror_narrative: str = ""
    os_data = await generate_operating_system(snapshot_data, mirror_narrative)
    return {"user_id": user_id, **os_data}
