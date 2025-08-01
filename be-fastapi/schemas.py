from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    hashedPassword: str
    isActive: bool
    role: str
