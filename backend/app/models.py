from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float
from sqlalchemy.sql import func
from app.database import Base
import json

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    mobile = Column(String(11), unique=True, index=True)
    national_code = Column(String(10), unique=True, index=True)
    password = Column(String)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    address = Column(String, nullable=True)
    birth_year = Column(Integer, nullable=True)
    shaba_number = Column(String(24), nullable=True)
    marital_status = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    terms_accepted = Column(Boolean, default=False)
    username = Column(String, unique=True, index=True)
    verification_code = Column(String(6), nullable=True)
    is_verified = Column(Boolean, default=False)
    wallet_balance = Column(Float, default=0.0)
    pending_balance = Column(Float, default=0.0)
    personal_box = Column(String, nullable=True)  # JSON برای گزارش‌ها
    landline_phone = Column(String(11), nullable=True)
    default_city = Column(String, nullable=True)
    is_blocked = Column(Boolean, default=False)  # بلاک شدن کاربر
    is_suspended = Column(Boolean, default=False)  # تعلیق کاربر
    penalty_amount = Column(Float, default=0.0)  # جریمه کاربر

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    amount = Column(Integer)
    type = Column(String)
    status = Column(String, default="pending")
    description = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    settled_at = Column(DateTime(timezone=True), nullable=True)
    admin_approved = Column(Boolean, default=False)
    payment_id = Column(String, nullable=True)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)
    stock = Column(Integer)
    description = Column(String)
    image_url = Column(String, nullable=True)
    status = Column(String, default="available")
    seller_id = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    low_sales_flag = Column(Boolean, default=False)
    unit = Column(String, default="عدد")
    one_time_code = Column(String(8), nullable=True)

class Inquiry(Base):
    __tablename__ = "inquiries"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer)
    seller_id = Column(Integer)  # خریدار
    price = Column(Integer, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expiry_at = Column(DateTime(timezone=True), nullable=True)
    finalized_at = Column(DateTime(timezone=True), nullable=True)
    edit_expiry_at = Column(DateTime(timezone=True), nullable=True)
    inquiry_type = Column(String, nullable=False)
    referrer_code = Column(String, nullable=True)
    original_seller_id = Column(Integer, nullable=True)  # فروشنده
    reactivation_user_id = Column(Integer, nullable=True)
    fee_paid = Column(Boolean, default=False)
    price_submission_fee_paid = Column(Boolean, default=False)
    quantity_requested = Column(Integer, nullable=True)
    quantity_supplied = Column(Integer, nullable=True)
    inquiry_fee = Column(Float, nullable=True)
    price_submission_fee = Column(Float, nullable=True)
    one_time_code = Column(String(8), nullable=True)
    city = Column(String, nullable=False)
    is_settled = Column(Boolean, default=False)

class ProductLog(Base):
    __tablename__ = "product_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    product_id = Column(Integer)
    action = Column(String)
    details = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ErrorReport(Base):
    __tablename__ = "error_reports"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    page = Column(String)
    description = Column(String)
    log = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Complaint(Base):
    __tablename__ = "complaints"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer)
    seller_id = Column(Integer)
    user_id = Column(Integer)
    description = Column(String)
    status = Column(String, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Coupon(Base):
    __tablename__ = "coupons"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)
    discount_percentage = Column(Float)
    valid_from = Column(DateTime(timezone=True))
    valid_to = Column(DateTime(timezone=True))
    max_uses = Column(Integer)
    used_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    amount = Column(Integer)
    payment_id = Column(String, unique=True, index=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    type = Column(String)

class SMSLog(Base):
    __tablename__ = "sms_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    mobile = Column(String(11))
    code = Column(String(6))
    status = Column(String, default="sent")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class AdminSettings(Base):
    __tablename__ = "admin_settings"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True)
    value = Column(Float, default=0.0)
    description = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        {"sqlite_autoincrement": True},
    )