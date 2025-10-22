from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/admin", tags=["admin"])

@router.put("/users/{user_id}/manage")
def manage_user(user_id: int, action: str, amount: Optional[float] = None, db: Session = Depends(get_db)):
    try:
        return crud.manage_user(db, user_id, action, amount)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))