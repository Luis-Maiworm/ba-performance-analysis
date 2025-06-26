from fastapi import APIRouter, Depends
from schemas import UserSchema
from models import UserModel
from repository import PythonRepository, get_python_repository
from prometheus_client import Counter

router = APIRouter()

REQUEST_COUNTER = Counter(
    "python_http_requests_total",
    "Total number of requests",
    ["method", "endpoint", "status_code"]
)

@router.get("/users/{user_id}")
def get_user(user_id: int, repository: PythonRepository = Depends(get_python_repository)):
    user = repository.read(user_id)
    if user:
        REQUEST_COUNTER.labels(method='GET', endpoint='/users/{user_id}', status_code=200).inc()
        return user
    REQUEST_COUNTER.labels(method='GET', endpoint='/users/{user_id}', status_code=404).inc()
    return {"message": "User not found"}, 404

@router.get("/users/")
def get_all_user(repository: PythonRepository = Depends(get_python_repository)):
    user = repository.read_all()
    if user:
        REQUEST_COUNTER.labels(method='GET', endpoint='/users/', status_code=200).inc()
        return user
    REQUEST_COUNTER.labels(method='GET', endpoint='/users/', status_code=404).inc()
    return {"message": "User not found"}, 404

@router.post("/users/")
def create_user(user: UserSchema, repository: PythonRepository = Depends(get_python_repository)):
    db_user = UserModel(**user.model_dump())
    new_user = repository.create(db_user)
    REQUEST_COUNTER.labels(method="POST", endpoint="/users/", status_code=201).inc()
    return new_user

@router.put("/users/{user_id}")
def update_user(user_id: int, user: UserSchema, repository: PythonRepository = Depends(get_python_repository)):
    updated_user = repository.update(user_id, **user.model_dump())
    if updated_user:
        REQUEST_COUNTER.labels(method="PUT", endpoint="/users/", status_code=200).inc()
        return updated_user
    REQUEST_COUNTER.labels(method="PUT", endpoint="/users/", status_code=404).inc()
    return {"message": "User not found"}, 404

@router.delete("/users/{user_id}")
def delete_user(user_id: int, repository: PythonRepository = Depends(get_python_repository)):
    if repository.delete(user_id):
        REQUEST_COUNTER.labels(method="DELETE", endpoint="/users/", status_code=200).inc()
        return {"message": "User deleted"}
    REQUEST_COUNTER.labels(method="DELETE", endpoint="/users/", status_code=404).inc()
    return {"message": "User not found"}, 404
