
from sqlalchemy.orm import Session

from . import models, schemas, auth

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.create_hashed_password(user.password)
    db_user = models.User(email=user.email, name=user.name, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# You might also want to add functions for updating or deleting users later
# def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
#     db_user = db.query(models.User).filter(models.User.id == user_id).first()
#     if db_user:
#         for key, value in user_update.dict(exclude_unset=True).items():
#             setattr(db_user, key, value)
#         db.commit()
#         db.refresh(db_user)
#     return db_user

# def delete_user(db: Session, user_id: int):
#     db_user = db.query(models.User).filter(models.User.id == user_id).first()
#     if db_user:
#         db.delete(db_user)
#         db.commit()
#     return db_user

    