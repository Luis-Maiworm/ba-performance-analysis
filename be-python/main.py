from contextlib import asynccontextmanager
from fastapi import FastAPI
from database import init_db
from router import router

API_PREFIX = "/python"

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starte Anwendung – Initialisiere Datenbank...")
    init_db()
    yield
    print("🛑 Stoppe Anwendung")

app = FastAPI(
    docs_url=f"{API_PREFIX}/docs",
    redoc_url=f"{API_PREFIX}/redoc",
    openapi_url=f"{API_PREFIX}/openapi.json"
)

app.include_router(router, prefix=API_PREFIX)

@app.get("/test")
def test_endpoint():
    return {"message": "Hello, World!"}
