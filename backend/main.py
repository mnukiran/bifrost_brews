from fastapi import FastAPI, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
from .routers import users # Import the users router



# FastAPI App
app = FastAPI()

# Include the users router
app.include_router(users.router, prefix="/users", tags=["users"])
