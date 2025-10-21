from fastapi import FastAPI
from app.routers import auth, profile, admin, products, coupons, payment, sms, inquiries
from app.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Ecommerce Platform",
    description="پلتفرم جامع مدیریت کاربران و محصولات (با تنظیمات پویا و سیستم اعتبار)",
    version="1.0.0"
)

app.include_router(auth.router, prefix="/api", tags=["Auth"])
app.include_router(profile.router, prefix="/api", tags=["Profile"])
app.include_router(admin.router, prefix="/api", tags=["Admin"])
app.include_router(products.router, prefix="/api", tags=["Products"])
app.include_router(coupons.router, prefix="/api", tags=["Coupons"])
app.include_router(payment.router, prefix="/api", tags=["Payment"])
app.include_router(sms.router, prefix="/api", tags=["SMS"])
app.include_router(inquiries.router, prefix="/api", tags=["Inquiries"])