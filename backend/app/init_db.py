from app.database import Base, engine
from app.models import User

print("ساخت دیتابیس...")
Base.metadata.create_all(bind=engine)
print("✅ دیتابیس با موفقیت ساخته شد.")
