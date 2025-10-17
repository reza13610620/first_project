from pydantic import BaseModel

class UserBase(BaseModel):
    phone_number: str
    name: str | None = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True
