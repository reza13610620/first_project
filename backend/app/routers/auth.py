from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.post('/register', response_model=schemas.UserOut)
def register(u: schemas.UserCreate, db: Session = Depends(get_db)):
    # require accept terms
    if not u.accepted_terms:
        raise HTTPException(status_code=400, detail='You must accept terms')
    existing = crud.get_user_by_phone(db, u.phone)
    if existing:
        raise HTTPException(status_code=400, detail='Phone already registered')
    user = crud.create_user(db, phone=u.phone, password=u.password, name=u.name, accepted_terms=u.accepted_terms)
    return user

@router.post('/login')
def login(form_data: schemas.UserCreate, db: Session = Depends(get_db)):
    # simple login: phone + password -> success/fail (we return user info)
    user = crud.get_user_by_phone(db, form_data.phone)
    if not user or not crud.verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail='Invalid credentials')
    return {'message': 'Login successful', 'user_id': user.id}
