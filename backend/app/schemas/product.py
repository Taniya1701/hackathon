from pydantic import BaseModel


class ProductCreate(BaseModel):
    producer_name: str
    name: str
    available_quantity: float
    unit: str
    price: float
    location: str