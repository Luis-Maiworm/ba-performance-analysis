from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from database import init_db, get_db
from repository import PythonRepository
from schemas import UserSchema
from models import UserModel


def get_python_repository(db: Session = Depends(get_db)):
    return PythonRepository(db)

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starte Anwendung – Initialisiere Datenbank...")
    init_db()
    yield
    print("🛑 Stoppe Anwendung")

app = FastAPI()


@app.get("/test")
def test_endpoint():
    return {"message": "Hello, World!"}

@app.get("/users/{user_id}")
def get_user(user_id: int, repository: PythonRepository = Depends(get_python_repository)):
    user = repository.read(user_id)
    if user:
        return user
    return {"message": "User not found"}, 404

@app.get("/users/")
def get_all_user(repository: PythonRepository = Depends(get_python_repository)):
    user = repository.read_all()
    if user:
        return user
    return {"message": "User not found"}, 404

@app.post("/users/")
def create_user(user: UserSchema, repository: PythonRepository = Depends(get_python_repository)):
    db_user = UserModel(**user.model_dump())
    new_user = repository.create(db_user)
    return new_user

@app.put("/users/{user_id}")
def update_user(user_id: int, user: UserSchema, repository: PythonRepository = Depends(get_python_repository)):
    updated_user = repository.update(user_id, **user.model_dump())
    if updated_user:
        return updated_user
    return {"message": "User not found"}, 404

@app.delete("/users/{user_id}")
def delete_user(user_id: int, repository: PythonRepository = Depends(get_python_repository)):
    if repository.delete(user_id):
        return {"message": "User deleted"}
    return {"message": "User not found"}, 404
