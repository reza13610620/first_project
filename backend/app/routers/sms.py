from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.post("/sms/send", response_model=dict)
def send_verification_sms(mobile: str, db: Session = Depends(get_db)):
    try:
        return crud.send_verification_code(db, mobile)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/sms/verify", response_model=dict)
def verify_sms(mobile: str, code: str, db: Session = Depends(get_db)):
    try:
        return crud.verify_code(db, mobile, code)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))