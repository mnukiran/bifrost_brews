from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import crud, models, schemas, auth
from ..database import get_db

router = APIRouter()

@router.post("/signup", response_model=schemas.User)
def signup_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = auth.create_hashed_password(user.password)
    return crud.create_user(db=db, user=user, hashed_password=hashed_password)

@router.post("/login")
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # In a real application, you would generate a JWT or other token here
    access_token = auth.create_access_token(data={"sub": user.email})

    return access_token

@router.post("/logout")
def logout_user():
    # In a real application, you would invalidate the token or session here
    return {"message": "Successfully logged out"}

@router.get("/users/me")
def read_users_me(current_user: str = Depends(auth.get_current_user)):
    return {"email": current_user}