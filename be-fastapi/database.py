from sqlalchemy.orm import sessionmaker
from models import Base
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

DATABASE_URL = f"sqlite+aiosqlite:///./fastapi.db"

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

def init_db():
    Base.metadata.create_all(bind=engine)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session