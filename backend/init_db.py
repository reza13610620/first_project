from app.database import Base, engine
from app.models import user

print("📦 در حال ساخت دیتابیس...")
Base.metadata.create_all(bind=engine)
print("✅ دیتابیس ساخته شد!")
