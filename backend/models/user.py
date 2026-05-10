from datetime import datetime

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None


class UserUpdate(BaseModel):
    full_name: str | None = None


class User(BaseModel):
    id: str
    email: str
    full_name: str | None
    is_admin: bool
    journey_completed: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
