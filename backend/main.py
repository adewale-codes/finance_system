from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import auth, journey, checkin, admin
from services.scheduler import setup_scheduler, shutdown_scheduler


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_scheduler()
    yield
    shutdown_scheduler()


app = FastAPI(title="Finops API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(journey.router, prefix="/journey", tags=["journey"])
app.include_router(checkin.router, prefix="/checkin", tags=["checkin"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])


@app.get("/")
async def root():
    return {"message": "Finops API", "version": "0.1.0", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "ok"}
