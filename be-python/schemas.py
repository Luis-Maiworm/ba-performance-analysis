from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    name: str
    email: str
    hashed_password: str
    is_active: bool
    role: str

class UserSchema(BaseModel):
    name: str
    email: str
    hashed_password: str
    is_active: bool
    role: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
