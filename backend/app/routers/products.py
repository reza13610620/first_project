from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/products", tags=["products"])

@router.post("/", response_model=schemas.ProductResponse)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_product(db, product)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{product_id}", response_model=schemas.ProductResponse)
def update_product(product_id: int, product: schemas.ProductUpdate, seller_id: int, db: Session = Depends(get_db)):
    try:
        return crud.update_product(db, product_id, product, seller_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    try:
        return crud.delete_product(db, product_id)
    except ValueError as e:
        raise HTTPException(status_code=403, detail=str(e))

@router.get("/", response_model=list[schemas.ProductResponse])
def get_products(seller_id: Optional[int] = None, category: Optional[str] = None, status: Optional[str] = None, db: Session = Depends(get_db)):
    products = crud.get_products(db, seller_id, category, status)
    if not products:
        raise HTTPException(status_code=404, detail="محصولی یافت نشد")
    return products