from fastapi import APIRouter, Depends
from schemas import UserCreate
from models import UserModel
from repository import PythonRepository, get_python_repository
from prometheus_client import Counter

router = APIRouter()

REQUEST_COUNTER = Counter(
    "python_http_requests_total",
    "Total number of requests",
    ["method", "endpoint", "is_success"]
)

@router.get("/users/{user_id}")
def get_user(user_id: int, repository: PythonRepository = Depends(get_python_repository)):
    user = repository.read(user_id)
    if user:
        REQUEST_COUNTER.labels(method='GET', endpoint='/users/{user_id}', is_success="true").inc()
        return user
    REQUEST_COUNTER.labels(method='GET', endpoint='/users/{user_id}', is_success="false").inc()
    return {"message": "User not found"}, 404

@router.get("/users/")
def get_all_user(
    repository: PythonRepository = Depends(get_python_repository)
):
    user = repository.read_all()
    if user:
        REQUEST_COUNTER.labels(method='GET', endpoint='/users/', is_success="true").inc()
        return user
    REQUEST_COUNTER.labels(method='GET', endpoint='/users/', is_success="false").inc()
    return {"message": "User not found"}, 404

@router.post("/users/")
def create_user(user: UserCreate, repository: PythonRepository = Depends(get_python_repository)):
    db_user = UserModel(**user.model_dump())
    new_user = repository.create(db_user)
    if user:
        REQUEST_COUNTER.labels(method="POST", endpoint="/users/", is_success="true").inc()
        return new_user
    REQUEST_COUNTER.labels(method='GET', endpoint='/users/', is_success="false").inc()
    return {"message": "Creation failed"}, 404

@router.put("/users/{user_id}")
def update_user(user_id: int, user: UserCreate, repository: PythonRepository = Depends(get_python_repository)):
    updated_user = repository.update(user_id, **user.model_dump())
    if updated_user:
        REQUEST_COUNTER.labels(method="PUT", endpoint="/users/", is_success="true").inc()
        return updated_user
    REQUEST_COUNTER.labels(method="PUT", endpoint="/users/", is_success="false").inc()
    return {"message": "User not found"}, 404

@router.delete("/users/{user_id}")
def delete_user(user_id: int, repository: PythonRepository = Depends(get_python_repository)):
    if repository.delete(user_id):
        REQUEST_COUNTER.labels(method="DELETE", endpoint="/users/", is_success="true").inc()
        return {"message": "User deleted"}
    REQUEST_COUNTER.labels(method="DELETE", endpoint="/users/", is_success="false").inc()
    return {"message": "User not found"}, 404
