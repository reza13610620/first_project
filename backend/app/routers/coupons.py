from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.post("/coupons", response_model=schemas.CouponResponse)
def create_coupon(coupon: schemas.CouponCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_coupon(db, coupon)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/coupons/{code}", response_model=schemas.CouponResponse)
def get_coupon(code: str, db: Session = Depends(get_db)):
    coupon = crud.get_coupon_by_code(db, code)
    if not coupon:
        raise HTTPException(status_code=404, detail="کوپن یافت نشد")
    return coupon

@router.post("/coupons/{code}/use")
def use_coupon_endpoint(code: str, db: Session = Depends(get_db)):
    try:
        coupon = crud.use_coupon(db, code)
        return {"message": "کوپن با موفقیت استفاده شد", "discount": coupon.discount_percentage}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))