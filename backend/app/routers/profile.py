from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.get("/profile/{user_id}", response_model=schemas.UserProfile)
def get_profile(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user_profile(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="کاربر یافت نشد")
    return user

@router.get("/profile/{user_id}/wallet", response_model=dict)
def get_wallet(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user_profile(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="کاربر یافت نشد")
    return {"user_id": user_id, "wallet_balance": user.wallet_balance, "pending_balance": user.pending_balance}

@router.post("/profile/finalize-balance")
def finalize_balance(db: Session = Depends(get_db)):
    try:
        return crud.finalize_monthly_balance(db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))