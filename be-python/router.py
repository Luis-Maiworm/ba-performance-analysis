from fastapi import APIRouter, Depends
from schemas import UserSchema
from models import UserModel
from repository import PythonRepository, get_python_repository

router = APIRouter()

@router.get("/users/{user_id}")
def get_user(user_id: int, repository: PythonRepository = Depends(get_python_repository)):
    user = repository.read(user_id)
    if user:
        return user
    return {"message": "User not found"}, 404

@router.get("/users/")
def get_all_user(repository: PythonRepository = Depends(get_python_repository)):
    user = repository.read_all()
    if user:
        return user
    return {"message": "User not found"}, 404

@router.post("/users/")
def create_user(user: UserSchema, repository: PythonRepository = Depends(get_python_repository)):
    db_user = UserModel(**user.model_dump())
    new_user = repository.create(db_user)
    return new_user

@router.put("/users/{user_id}")
def update_user(user_id: int, user: UserSchema, repository: PythonRepository = Depends(get_python_repository)):
    updated_user = repository.update(user_id, **user.model_dump())
    if updated_user:
        return updated_user
    return {"message": "User not found"}, 404

@router.delete("/users/{user_id}")
def delete_user(user_id: int, repository: PythonRepository = Depends(get_python_repository)):
    if repository.delete(user_id):
        return {"message": "User deleted"}
    return {"message": "User not found"}, 404
