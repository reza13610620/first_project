from fastapi import FastAPI
from app.routes import users
from app.database import engine, Base

# ایجاد جداول دیتابیس (وقتی تست کنی)
Base.metadata.create_all(bind=engine)

# ساخت اپ اصلی
app = FastAPI(
    title="My FastAPI Project",
    description="پروژه‌ی نمونه برای ساخت بک‌اند",
    version="1.0.0"
)

# اضافه کردن مسیرهای کاربران
app.include_router(users.router, prefix="/users", tags=["Users"])

@app.get("/")
def home():
    return {"message": "سرور FastAPI با موفقیت بالا آمد ✅"}
