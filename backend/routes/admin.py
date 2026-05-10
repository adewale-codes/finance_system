from fastapi import APIRouter, Depends, HTTPException, Header
from typing import Annotated

from database.connection import get_supabase

router = APIRouter()


async def require_admin(authorization: Annotated[str | None, Header()] = None):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.removeprefix("Bearer ")
    supabase = get_supabase()

    try:
        user = supabase.auth.get_user(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    # TODO: check is_admin flag in profiles table
    # profile = supabase.table("profiles").select("is_admin").eq("id", user.user.id).single().execute()
    # if not profile.data.get("is_admin"):
    #     raise HTTPException(status_code=403, detail="Forbidden")

    return user.user


@router.get("/stats", dependencies=[Depends(require_admin)])
async def get_stats():
    supabase = get_supabase()
    # TODO: aggregate from DB
    return {
        "total_users": 0,
        "active_users_7d": 0,
        "journeys_completed": 0,
        "checkins_today": 0,
    }


@router.get("/users", dependencies=[Depends(require_admin)])
async def list_users(page: int = 1, page_size: int = 50):
    supabase = get_supabase()
    # TODO: paginated fetch from profiles table
    return {"users": [], "total": 0, "page": page, "page_size": page_size}


@router.delete("/users/{user_id}", dependencies=[Depends(require_admin)])
async def delete_user(user_id: str):
    supabase = get_supabase()
    # TODO: soft-delete — anonymise personal data, keep aggregated stats
    return {"message": f"User {user_id} deleted"}
