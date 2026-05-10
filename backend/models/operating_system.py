from datetime import datetime

from pydantic import BaseModel


class OperatingSystemCreate(BaseModel):
    user_id: str
    core_principle: str
    monthly_targets: dict
    weekly_actions: list[str]
    mindset_reframe: str
    ninety_day_focus: str


class OperatingSystem(OperatingSystemCreate):
    id: str
    version: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
