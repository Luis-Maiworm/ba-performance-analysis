from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    hashedPassword = Column(String)
    isActive = Column(Boolean, default=True)
    role = Column(String, default="user")
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
