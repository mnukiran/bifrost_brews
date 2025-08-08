
from passlib.context import CryptContext
from jose import JWTError, decode, encode
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status, Depends, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from . import crud, models
from .database import get_db

# Configure the password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_hashed_password(password: str) -> str:
  """Hashes a given password using bcrypt."""
  return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
  """Verifies a plain password against a hashed password"""
  return pwd_context.verify(plain_password, hashed_password)


SECRET_KEY = "your-secret-key" # Change this to a strong, random string
# to get a random string run: openssl rand -hex 32
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login", auto_error=False)

async def get_current_user(request: Request, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = request.cookies.get("access_token")

    if not token:
        # Fallback to Authorization header if cookie is not present
        auth_header = await oauth2_scheme(request)
        if not auth_header:
          raise credentials_exception
        token = auth_header

    # The cookie value might be "Bearer <token>"
    if token.startswith("Bearer "):
        token = token.split("Bearer ")[1]

    try:
        payload = decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = crud.get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user

    