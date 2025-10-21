from pydantic import BaseModel
from typing import Optional, List

class UserCreate(BaseModel):
    mobile: str
    national_code: str
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    birth_year: Optional[int] = None
    shaba_number: Optional[str] = None
    marital_status: Optional[str] = None
    terms_accepted: bool
    landline_phone: Optional[str] = None
    default_city: Optional[str] = None

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    address: Optional[str] = None
    wallet_balance: Optional[float] = None
    is_blocked: Optional[bool] = None
    is_suspended: Optional[bool] = None
    penalty_amount: Optional[float] = None

class UserResponse(BaseModel):
    id: int
    mobile: str
    first_name: Optional[str]
    last_name: Optional[str]
    wallet_balance: float
    pending_balance: float
    is_blocked: bool
    is_suspended: bool
    penalty_amount: float

class TransactionCreate(BaseModel):
    user_id: int
    amount: int
    type: str
    description: str
    admin_approved: bool

class ProductCreate(BaseModel):
    name: str
    category: str
    stock: int
    description: str
    image_url: Optional[str] = None
    seller_id: int
    unit: Optional[str] = "عدد"

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    status: Optional[str] = None
    unit: Optional[str] = None

class ProductResponse(BaseModel):
    id: int
    name: str
    category: str
    stock: int
    description: str
    image_url: Optional[str] = None
    status: str
    seller_id: int
    created_at: str
    low_sales_flag: bool
    unit: str
    one_time_code: Optional[str] = None

class InquiryCreate(BaseModel):
    product_id: int
    seller_id: int  # خریدار
    inquiry_type: str
    quantity_requested: int
    city: str

class InquiryResponse(BaseModel):
    id: int
    product_id: int
    seller_id: int  # خریدار
    price: Optional[int] = None
    status: str
    created_at: str
    expiry_at: Optional[str] = None
    finalized_at: Optional[str] = None
    edit_expiry_at: Optional[str] = None
    inquiry_type: str
    quantity_requested: Optional[int] = None
    quantity_supplied: Optional[int] = None
    city: str
    is_settled: bool
    all_prices: Optional[list] = None
    suggestion: Optional[str] = None

class UserProfileResponse(BaseModel):
    id: int
    first_name: Optional[str]
    last_name: Optional[str]
    wallet_balance: float
    pending_balance: float
    purchases: List[InquiryResponse] = []
    sales: List[InquiryResponse] = []

class ProductLogResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    action: str
    details: str
    created_at: str

class ErrorReportCreate(BaseModel):
    user_id: int
    page: str
    description: str
    log: str