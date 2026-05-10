from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from database.connection import get_supabase

router = APIRouter()


class SignUpRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None


class SignInRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/signup")
async def signup(request: SignUpRequest):
    supabase = get_supabase()
    try:
        response = supabase.auth.sign_up({
            "email": request.email,
            "password": request.password,
        })
        if response.user:
            # TODO: send welcome email via email_service
            return {"message": "Account created", "user_id": response.user.id}
        raise HTTPException(status_code=400, detail="Signup failed")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/signin")
async def signin(request: SignInRequest):
    supabase = get_supabase()
    try:
        response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password,
        })
        return {
            "access_token": response.session.access_token,
            "user_id": response.user.id,
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials")


@router.post("/signout")
async def signout():
    # JWT is stateless — client drops the token; optionally revoke session in Supabase
    return {"message": "Signed out"}
