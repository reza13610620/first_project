from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        print(f"Registering user: {user.mobile}, {user.national_code}")
        if not user.terms_accepted:
            raise HTTPException(status_code=400, detail="پذیرش قوانین اجباری است.")
        user_data = crud.create_user(db, user)
        return user_data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=schemas.UserResponse)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    try:
        print(f"Logging in with identifier: {user.identifier}")
        user_data = crud.get_user_by_identifier(db, user.identifier, user.password)
        return user_data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))