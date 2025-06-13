from contextlib import asynccontextmanager
from fastapi import FastAPI, Response
from database import init_db
from router import router
from prometheus_client import Counter, generate_latest, CONTENT_TYPE_LATEST


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starte Anwendung – Initialisiere Datenbank...")
    init_db()
    yield
    print("🛑 Stoppe Anwendung")

app = FastAPI(lifespan=lifespan)

REQUEST_COUNTER = Counter(
    "python_http_requests_total",
    "Total number of requests",
    ["method", "endpoint", "status_code"]
)

app.include_router(router)

@app.get("/test")
def test_endpoint():
    REQUEST_COUNTER.labels(method="GET", endpoint="/test", status_code=200).inc()
    return {"message": "Hello, World!"}

@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
