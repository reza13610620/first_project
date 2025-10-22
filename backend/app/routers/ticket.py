from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud, schemas

router = APIRouter()

@router.post('/', response_model=schemas.TicketOut)
def create_ticket(tc: schemas.TicketCreate, user_id: int = 1, db: Session = Depends(get_db)):
    # NOTE: for simplicity we get user_id as param (in real app use auth)
    ticket = crud.create_ticket(db, user_id=user_id, subject=tc.subject, body=tc.body)
    return ticket

@router.get('/', response_model=list[schemas.TicketOut])
def list_tickets(user_id: int = None, db: Session = Depends(get_db)):
    return crud.list_tickets(db, user_id=user_id)
