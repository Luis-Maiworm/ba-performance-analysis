from sqlalchemy.orm import Session
from models import UserModel

class PythonRepository():

    def __init__(self, db: Session):
        self.db = db

    def create(self, obj: UserModel):
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def read(self, obj_id):
        return self.db.query(UserModel).filter(UserModel.id == obj_id).first()

    def read_all(self):
        return self.db.query(UserModel).all()

    def update(self, obj_id, **kwargs):
        item = self.db.query(UserModel).get(obj_id)
        if not item:
            return None
        for attr, value in kwargs.items():
            if hasattr(item, attr):
                setattr(item, attr, value)
        self.db.commit()
        return item

    def delete(self, obj_id):
        item = self.db.query(UserModel).get(obj_id)
        if item:
            self.db.delete(item)
            self.db.commit()
            return True
        return False