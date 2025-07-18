from fastapi import APIRouter, Depends
from schemas import UserCreate
from models import UserModel
from repository import PythonRepository, get_python_repository

router = APIRouter()

@router.get("/users/{id}")
def get_user(id: int, repository: PythonRepository = Depends(get_python_repository)):
    user = repository.read(id)
    if user:
        return user
    return {"message": "User not found"}, 404

@router.get("/users/")
def get_all_user(
    repository: PythonRepository = Depends(get_python_repository)
):
    user = repository.read_all()
    if user:
        return user
    return {"message": "User not found"}, 404

@router.post("/users/")
def create_user(user: UserCreate, repository: PythonRepository = Depends(get_python_repository)):
    db_user = UserModel(**user.model_dump())
    new_user = repository.create(db_user)
    if user:
        return new_user
    return {"message": "Creation failed"}, 404

@router.put("/users/{id}")
def update_user(id: int, user: UserCreate, repository: PythonRepository = Depends(get_python_repository)):
    updated_user = repository.update(id, **user.model_dump())
    if updated_user:
        return updated_user
    return {"message": "User not found"}, 404

@router.delete("/users/{id}")
def delete_user(id: int, repository: PythonRepository = Depends(get_python_repository)):
    if repository.delete(id):
        return {"message": "User deleted"}
    return {"message": "User not found"}, 404
