
from fastapi import FastAPI
from .routers import users # Import the users router
from .database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI()

# Include the users router
app.include_router(users.router, tags=["users"])

    