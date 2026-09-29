from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.product import Product
from app.models.requirement import Requirement
from app.services.matching_engine import match_suppliers

router = APIRouter(prefix="/requirements", tags=["Requirements"])


class RequirementCreate(BaseModel):
    buyer_name: str
    product_name: str
    required_quantity: float
    unit: str
    budget: float
    location: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def requirement_to_dict(r):
    return {
        "id": r.id,
        "buyer_name": r.buyer_name,
        "product_name": r.product_name,
        "required_quantity": r.required_quantity,
        "unit": r.unit,
        "budget": r.budget,
        "location": r.location,
    }


@router.get("/")
def list_requirements(db: Session = Depends(get_db)):
    return [requirement_to_dict(r) for r in db.query(Requirement).all()]


@router.post("/")
def create_requirement(data: RequirementCreate, db: Session = Depends(get_db)):
    new_requirement = Requirement(**data.model_dump())
    db.add(new_requirement)
    db.commit()
    db.refresh(new_requirement)

    products = db.query(Product).all()
    result = match_suppliers(new_requirement, products)

    return {**requirement_to_dict(new_requirement), **result}