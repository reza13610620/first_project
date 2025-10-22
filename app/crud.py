from sqlalchemy.orm import Session
from app.models.user import User
from typing import Optional

def get_user_by_phone(db: Session, phone_number: str):
    return db.query(User).filter(User.phone_number == phone_number).first()

def create_user(db: Session, user: dict):
    db_user = User(**user)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(User).all()

# تابع جدید برای مثال (می‌تونی حذف کنی اگه لازم نیست)
def get_products(db: Session, seller_id: Optional[int] = None, category: Optional[str] = None, status: Optional[str] = None):
    query = db.query(User)  # تغییر به مدل درست (مثلاً Product اگه داری)
    if seller_id:
        query = query.filter(User.id == seller_id)  # تغییر فیلتر بر اساس مدل
    if category:
        query = query.filter(User.name.ilike(f"%{category}%"))  # تغییر فیلتر
    if status:
        query = query.filter(User.status == status)  # تغییر فیلتر
    return query.all()