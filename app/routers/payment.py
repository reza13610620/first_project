from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db
import os
from dotenv import load_dotenv
load_dotenv()

# Simulated payment gateway (replace with real API like ZarinPal or PayPal)
router = APIRouter()

@router.post("/payment/init", response_model=schemas.PaymentResponse)
def initiate_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
    # Simulated payment ID (in real case, use gateway API)
    payment_id = f"PAY_{payment.user_id}_{int(datetime.now().timestamp())}"
    db_payment = crud.create_payment(db, schemas.PaymentCreate(**payment.dict(), payment_id=payment_id))
    
    # Here you would integrate with a real payment gateway
    # Example: Redirect URL or token from gateway
    return db_payment

@router.get("/payment/status/{payment_id}", response_model=schemas.PaymentResponse)
def check_payment_status(payment_id: str, db: Session = Depends(get_db)):
    payment = crud.get_payment_by_id(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="پرداخت یافت نشد")
    # Simulated status update (in real case, check with gateway)
    if payment.status == "pending":
        payment.status = "success"  # Simulated success
        db.commit()
        db.refresh(payment)
    return payment