from app.database import Base, engine
from app.models.user import User

print("📦 در حال ساخت دیتابیس...")
Base.metadata.create_all(bind=engine)
print("✅ دیتابیس ساخته شد!")
