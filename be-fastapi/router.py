from fastapi import APIRouter, Depends, HTTPException
from schemas import UserCreate
from models import UserModel
from repository import PythonRepository, get_python_repository

router = APIRouter()

@router.get("/users/")
async def get_all_user(
    repository: PythonRepository = Depends(get_python_repository)
):
    users = await repository.read_all()
    if not users:
        raise HTTPException(status_code=404, detail="User not found")
    return users

@router.post("/users/")
async def create_user(user: UserCreate, repository: PythonRepository = Depends(get_python_repository)):
    db_user = UserModel(**user.model_dump())
    new_user = await repository.create(db_user)
    if not new_user:
        raise HTTPException(status_code=400, detail="Creation failed")  
    return new_user

@router.get("/users/{id}")
async def get_user(id: int, repository: PythonRepository = Depends(get_python_repository)):
    user = await repository.read(id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/users/{id}")
async def update_user(id: int, user: UserCreate, repository: PythonRepository = Depends(get_python_repository)):
    updated_user = await repository.update(id, **user.model_dump())
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user



@router.delete("/users/{id}")
async def delete_user(id: int, repository: PythonRepository = Depends(get_python_repository)):
    success = await repository.delete(id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}
