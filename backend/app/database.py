from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# آدرس دیتابیس (برای تست sqlite استفاده می‌کنیم)
DATABASE_URL = "sqlite:///./test.db"

# ساخت engine
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# ساخت Session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ساخت Base برای مدل‌ها
Base = declarative_base()

# تابع برای ساخت سشن در صورت نیاز
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
