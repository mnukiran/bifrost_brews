from passlib.context import CryptContext
from jose import JWTError, decode, encode
from datetime import datetime, timedelta
from fastapi import HTTPException, status, Depends



# Configure the password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_hashed_password(password: str) -> str:
  """Hashes a given password using bcrypt."""
  return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
  """Verifies a plain password against a hashed password"""

SECRET_KEY = "your-secret-key" # Change this to a strong, random string
# to get a random string run: openssl rand -hex 32
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(OAuth2PasswordBearer(tokenUrl="login"))):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise credentials_exception
