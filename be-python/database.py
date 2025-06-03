from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models import Base

DATABASE_URL = f"sqlite:///./python.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Datenbank erstellen (falls nicht vorhanden)
def init_db():
    Base.metadata.create_all(bind=engine)

# Dependency für FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
