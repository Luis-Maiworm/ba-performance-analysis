from pydantic import BaseModel
from typing import Optional

class UserSchema(BaseModel):
    name: str
    email: str

    class Config:
        from_attributes = True
