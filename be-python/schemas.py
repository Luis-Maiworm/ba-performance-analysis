from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    name: str
    email: str
    hashedPassword: str
    isActive: bool
    role: str

class UserSchema(BaseModel):
    name: str
    email: str
    hashedPassword: str
    isActive: bool
    role: str
    createdAt: Optional[datetime]
    updatedAt: Optional[datetime]

    class Config:
        from_attributes = True
