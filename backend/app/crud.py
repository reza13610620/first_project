from sqlalchemy.orm import Session
import jdatetime
from datetime import timedelta
import json
from app import models, schemas

def create_product(db: Session, product: schemas.ProductCreate):
    existing_product = db.query(models.Product).filter(
        models.Product.name == product.name,
        models.Product.seller_id == product.seller_id
    ).first()
    if existing_product:
        raise ValueError("محصولی با این نام توسط شما قبلاً ثبت شده است.")
    
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    db_log = models.ProductLog(
        user_id=product.seller_id,
        product_id=db_product.id,
        action="create",
        details=f"محصول {db_product.name} ایجاد شد"
    )
    db.add(db_log)
    db.commit()
    
    return db_product

def update_product(db: Session, product_id: int, product: schemas.ProductUpdate, seller_id: int):
    db_product = db.query(models.Product).filter(
        models.Product.id == product_id,
        models.Product.seller_id == seller_id
    ).first()
    if not db_product:
        raise ValueError("محصول یافت نشد یا شما اجازه ویرایش آن را ندارید.")
    
    update_data = product.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    db.commit()
    db.refresh(db_product)
    
    db_log = models.ProductLog(
        user_id=seller_id,
        product_id=db_product.id,
        action="update",
        details=f"محصول {db_product.name} به‌روزرسانی شد"
    )
    db.add(db_log)
    db.commit()
    
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise ValueError("محصول یافت نشد.")
    if True:  # جایگزین با شرط ادمین
        db.delete(db_product)
        db.commit()
        
        db_log = models.ProductLog(
            user_id=db_product.seller_id,
            product_id=product_id,
            action="delete",
            details=f"محصول با شناسه {product_id} توسط ادمین حذف شد"
        )
        db.add(db_log)
        db.commit()
        return {"message": "محصول با موفقیت حذف شد"}
    raise ValueError("فقط ادمین می‌تواند محصول را حذف کند.")

def get_products(db: Session, seller_id: Optional[int] = None, category: Optional[str] = None, status: Optional[str] = None):
    query = db.query(models.Product)
    if seller_id:
        query = query.filter(models.Product.seller_id == seller_id)
    if category:
        query = query.filter(models.Product.category == category)
    if status:
        query = query.filter(models.Product.status == status)
    return query.all()

def get_user_profile(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise ValueError("کاربر یافت نشد.")
    
    purchases = db.query(models.Inquiry).filter(
        models.Inquiry.seller_id == user_id,
        models.Inquiry.status == "finalized",
        models.Inquiry.is_settled == True
    ).all()
    
    sales = db.query(models.Inquiry).filter(
        models.Inquiry.original_seller_id == user_id,
        models.Inquiry.status == "finalized",
        models.Inquiry.is_settled == True
    ).all()
    
    if user.personal_box:
        user.personal_box = json.loads(user.personal_box)
    return schemas.UserProfileResponse(
        id=user.id,
        first_name=user.first_name,
        last_name=user.last_name,
        wallet_balance=user.wallet_balance,
        pending_balance=user.pending_balance,
        purchases=purchases,
        sales=sales
    )

def create_inquiry(db: Session, inquiry: schemas.InquiryCreate):
    product = db.query(models.Product).filter(models.Product.id == inquiry.product_id).first()
    if not product:
        raise ValueError("محصول یافت نشد")
    
    user = db.query(models.User).filter(models.User.id == inquiry.seller_id).first()
    if not user or not user.default_city or user.is_blocked or user.is_suspended:
        raise ValueError("کاربر معتبر نیست یا بلاک/تعلیق شده است")
    
    current_time = jdatetime.datetime.now()
    active_setting = db.query(models.AdminSettings).filter(
        models.AdminSettings.key == f"inquiry_{inquiry.inquiry_type}",
        models.AdminSettings.is_active == True
    ).first()
    inquiry_fee_setting = db.query(models.AdminSettings).filter(models.AdminSettings.key == "inquiry_fee").first()
    price_submission_fee_setting = db.query(models.AdminSettings).filter(models.AdminSettings.key == "price_submission_fee").first()
    
    if not active_setting:
        raise ValueError(f"استعلام نوع {inquiry.inquiry_type} غیرفعال است")
    
    if inquiry.inquiry_type not in ["urgent", "daily", "monthly", "weekly", "seasonal"]:
        raise ValueError("نوع استعلام نامعتبر است")
    
    final_city = inquiry.city if inquiry.city else user.default_city
    
    existing_inquiry = db.query(models.Inquiry).filter(
        models.Inquiry.product_id == inquiry.product_id,
        models.Inquiry.inquiry_type == inquiry.inquiry_type,
        models.Inquiry.city == final_city,
        models.Inquiry.status.in_(["pending", "approved"])
    ).order_by(models.Inquiry.created_at.desc()).first()
    
    if existing_inquiry and current_time > existing_inquiry.expiry_at:
        if existing_inquiry.status not in ["finalized", "canceled"]:
            existing_inquiry.status = "expired"
            db.commit()
        inquiry_fee = inquiry_fee_setting.value if inquiry_fee_setting and inquiry_fee_setting.is_active else 0
        price_submission_fee = price_submission_fee_setting.value if price_submission_fee_setting and price_submission_fee_setting.is_active else 0
        new_inquiry = models.Inquiry(
            product_id=inquiry.product_id,
            seller_id=inquiry.seller_id,
            price=None,
            inquiry_type=inquiry.inquiry_type,
            expiry_at=get_expiry_time(inquiry.inquiry_type),
            original_seller_id=product.seller_id,
            edit_expiry_at=get_expiry_time(inquiry.inquiry_type) + timedelta(minutes=30),
            quantity_requested=inquiry.quantity_requested,
            city=final_city,
            inquiry_fee=inquiry_fee,
            price_submission_fee=price_submission_fee
        )
        db.add(new_inquiry)
        db.commit()
        db.refresh(new_inquiry)
    elif existing_inquiry:
        return {"message": f"فرم {inquiry.inquiry_type} برای شهر {existing_inquiry.city} فعال است، لطفاً از آن استفاده کنید"}
    else:
        inquiry_fee = inquiry_fee_setting.value if inquiry_fee_setting and inquiry_fee_setting.is_active else 0
        price_submission_fee = price_submission_fee_setting.value if price_submission_fee_setting and price_submission_fee_setting.is_active else 0
        db_inquiry = models.Inquiry(
            product_id=inquiry.product_id,
            seller_id=inquiry.seller_id,
            price=None,
            inquiry_type=inquiry.inquiry_type,
            expiry_at=get_expiry_time(inquiry.inquiry_type),
            original_seller_id=product.seller_id,
            edit_expiry_at=get_expiry_time(inquiry.inquiry_type) + timedelta(minutes=30),
            quantity_requested=inquiry.quantity_requested,
            city=final_city,
            inquiry_fee=inquiry_fee,
            price_submission_fee=price_submission_fee
        )
        db.add(db_inquiry)
        db.commit()
        db.refresh(db_inquiry)
    
    return db_inquiry

def finalize_inquiry(db: Session, inquiry_id: int):
    inquiry = db.query(models.Inquiry).filter(models.Inquiry.id == inquiry_id).first()
    if not inquiry or inquiry.status != "pending":
        raise ValueError("استعلام معتبر نیست یا نهایی شده است.")
    
    if not inquiry.price or not inquiry.quantity_supplied or not inquiry.quantity_requested:
        raise ValueError("اطلاعات قیمت یا تعداد کامل نیست.")
    
    total_amount = inquiry.price * inquiry.quantity_supplied
    fee_percentage = 0.005  # 0.5%
    fee_amount = total_amount * fee_percentage
    
    buyer = db.query(models.User).filter(models.User.id == inquiry.seller_id).first()
    seller = db.query(models.User).filter(models.User.id == inquiry.original_seller_id).first()
    
    if buyer.is_blocked or buyer.is_suspended or seller.is_blocked or seller.is_suspended:
        raise ValueError("یکی از طرفین بلاک یا تعلیق شده است.")
    
    # بررسی موجودی برای پرداخت کارمزد توسط خریدار
    buyer_fee = max(0, fee_amount - (inquiry.inquiry_fee or 0))
    if buyer.wallet_balance < buyer_fee:
        inquiry.status = "canceled"
        db.commit()
        return {"message": "موجودی خریدار برای کارمزد کافی نیست، درخواست حذف شد."}
    
    # بررسی موجودی برای پرداخت کارمزد توسط فروشنده
    seller_fee = max(0, fee_amount - (inquiry.price_submission_fee or 0))
    if seller.wallet_balance < seller_fee:
        inquiry.status = "canceled"
        db.commit()
        return {"message": "موجودی فروشنده برای کارمزد کافی نیست، پیشنهاد حذف شد."}
    
    # کسر کارمزد
    buyer.wallet_balance -= buyer_fee
    seller.wallet_balance -= seller_fee
    
    # ثبت تراکنش‌ها
    db_transaction_buyer = models.Transaction(
        user_id=buyer.id,
        amount=int(buyer_fee),
        type="inquiry_fee",
        description=f"کارمزد استعلام خرید برای استعلام {inquiry_id}",
        status="completed"
    )
    db_transaction_seller = models.Transaction(
        user_id=seller.id,
        amount=int(seller_fee),
        type="inquiry_fee",
        description=f"کارمزد استعلام فروش برای استعلام {inquiry_id}",
        status="completed"
    )
    
    db.add(db_transaction_buyer)
    db.add(db_transaction_seller)
    db.commit()
    
    inquiry.status = "settled"
    inquiry.is_settled = True
    db.commit()
    
    return {"message": "استعلام تسویه شد، اطلاعات پس از نهایی‌سازی ارسال می‌شود."}

def manage_user(db: Session, user_id: int, action: str, amount: Optional[float] = None):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise ValueError("کاربر یافت نشد.")
    
    if action == "delete":
        db.delete(user)
        db.commit()
        return {"message": "کاربر با موفقیت حذف شد."}
    elif action == "block":
        user.is_blocked = True
        db.commit()
        return {"message": "کاربر بلاک شد."}
    elif action == "unblock":
        user.is_blocked = False
        db.commit()
        return {"message": "بلاک کاربر برداشته شد."}
    elif action == "suspend":
        user.is_suspended = True
        db.commit()
        return {"message": "کاربر تعلیق شد."}
    elif action == "unsuspend":
        user.is_suspended = False
        db.commit()
        return {"message": "تعلیق کاربر برداشته شد."}
    elif action == "penalize":
        if amount is None or amount < 0:
            raise ValueError("مبلغ جریمه معتبر نیست.")
        user.penalty_amount += amount
        user.wallet_balance -= amount
        db.commit()
        db_transaction = models.Transaction(
            user_id=user_id,
            amount=int(amount),
            type="penalty",
            description=f"جریمه به مبلغ {amount} تومان",
            status="completed"
        )
        db.add(db_transaction)
        db.commit()
        return {"message": f"جریمه {amount} تومان اعمال شد."}
    elif action == "reward":
        if amount is None or amount < 0:
            raise ValueError("مبلغ تشویق معتبر نیست.")
        user.wallet_balance += amount
        db.commit()
        db_transaction = models.Transaction(
            user_id=user_id,
            amount=int(amount),
            type="reward",
            description=f"تشویق به مبلغ {amount} تومان",
            status="completed"
        )
        db.add(db_transaction)
        db.commit()
        return {"message": f"تشویق {amount} تومان اعمال شد."}
    raise ValueError("عملیات نامعتبر است.")

# تابع کمکی برای محاسبه زمان انقضا
def get_expiry_time(inquiry_type):
    current_time = jdatetime.datetime.now()
    if inquiry_type == "urgent":
        return current_time + timedelta(minutes=15)
    elif inquiry_type == "daily":
        return current_time + timedelta(hours=24)
    elif inquiry_type == "weekly":
        return current_time + timedelta(days=7)
    elif inquiry_type == "monthly":
        return current_time + timedelta(days=30)
    elif inquiry_type == "seasonal":
        return current_time + timedelta(days=90)
    return current_time + timedelta(hours=24)