from sqlalchemy import select
from models import UserModel
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db

def get_python_repository(db: AsyncSession = Depends(get_db)):
    return PythonRepository(db)

class PythonRepository():

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, obj: UserModel):
        self.db.add(obj)
        await self.db.commit()
        await self.db.refresh(obj)
        return obj

    async def read(self, obj_id):
        result = await self.db.execute(select(UserModel).where(UserModel.id == obj_id))
        return result.scalars().all()

    async def read_all(self, limit = 100):
        result = await self.db.execute(select(UserModel).limit(limit))
        return result.scalars().all()

    async def update(self, obj_id, **kwargs):
        result = await self.db.execute(select(UserModel).where(UserModel.id == obj_id))
        item = result.scalars().first()
        if not item:
            return None
        for attr, value in kwargs.items():
            if hasattr(item, attr):
                setattr(item, attr, value)
        await self.db.commit()
        return item

    async def delete(self, obj_id):
        result = await self.db.execute(select(UserModel).where(UserModel.id == obj_id))
        item = result.scalars().first()
        if item:
            await self.db.delete(item)
            await self.db.commit()
            return True
        return False