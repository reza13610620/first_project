from celery import Celery
from app.database import SessionLocal
from app import crud, models
import jdatetime
from datetime import timedelta

celery_app = Celery('tasks', broker='redis://localhost:6379/0')

@celery_app.task
def check_inquiry_expiry():
    db = SessionLocal()
    try:
        current_time = jdatetime.datetime.now()
        inquiries = db.query(models.Inquiry).filter(
            models.Inquiry.status.in_(["pending", "approved"]),
            models.Inquiry.expiry_at < current_time
        ).all()
        
        for inquiry in inquiries:
            if inquiry.status not in ["finalized", "canceled"]:
                inquiry.status = "expired"
                db.commit()
                active_setting = db.query(models.AdminSettings).filter(
                    models.AdminSettings.key == f"inquiry_{inquiry.inquiry_type}",
                    models.AdminSettings.is_active == True
                ).first()
                if active_setting:
                    inquiry_fee_setting = db.query(models.AdminSettings).filter(models.AdminSettings.key == "inquiry_fee").first()
                    price_submission_fee_setting = db.query(models.AdminSettings).filter(models.AdminSettings.key == "price_submission_fee").first()
                    inquiry_fee = inquiry_fee_setting.value if inquiry_fee_setting and inquiry_fee_setting.is_active else 0
                    price_submission_fee = price_submission_fee_setting.value if price_submission_fee_setting and price_submission_fee_setting.is_active else 0
                    new_inquiry = models.Inquiry(
                        product_id=inquiry.product_id,
                        seller_id=inquiry.seller_id,
                        price=None,
                        inquiry_type=inquiry.inquiry_type,
                        expiry_at=crud.get_expiry_time(inquiry.inquiry_type),
                        original_seller_id=inquiry.original_seller_id,
                        edit_expiry_at=crud.get_expiry_time(inquiry.inquiry_type) + timedelta(minutes=30),
                        quantity_requested=inquiry.quantity_requested,
                        inquiry_fee=inquiry_fee,
                        price_submission_fee=price_submission_fee
                    )
                    db.add(new_inquiry)
                    db.commit()
                    product = db.query(models.Product).filter(models.Product.id == inquiry.product_id).first()
                    crud.send_notification(db, inquiry.seller_id, f"30 دقیقه برای اصلاح قیمت کالای {product.name} زمان دارید.")

        # بررسی انتخاب خودکار پس از 10 دقیقه
        finalized_inquiries = db.query(models.Inquiry).filter(
            models.Inquiry.status == "pending",
            models.Inquiry.edit_expiry_at < current_time - timedelta(minutes=10)
        ).all()
        for inquiry in...