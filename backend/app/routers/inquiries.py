from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/inquiries", tags=["inquiries"])

@router.post("/", response_model=schemas.InquiryResponse)
def create_inquiry(inquiry: schemas.InquiryCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_inquiry(db, inquiry)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/inquiries/{inquiry_id}/finalize")
def finalize_inquiry(inquiry_id: int, db: Session = Depends(get_db)):
    try:
        return crud.finalize_inquiry(db, inquiry_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))