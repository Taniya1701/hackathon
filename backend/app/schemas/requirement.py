from pydantic import BaseModel


class RequirementCreate(BaseModel):
    buyer_name: str
    product_name: str
    required_quantity: float
    unit: str
    budget: float
    location: str