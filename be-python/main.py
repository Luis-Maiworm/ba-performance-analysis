from contextlib import asynccontextmanager
from fastapi import FastAPI, Response
from database import init_db
from router import router
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starte Anwendung – Initialisiere Datenbank...")
    init_db()
    yield
    print("🛑 Stoppe Anwendung")

app = FastAPI(lifespan=lifespan)



app.include_router(router)

@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
