from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.requirement import Requirement
from app.schemas.requirement import RequirementCreate

router = APIRouter(
    prefix="/requirements",
    tags=["Requirements"]
)


@router.post("/")
def add_requirement(
    requirement: RequirementCreate,
    db: Session = Depends(get_db)
):

    new_requirement = Requirement(
        buyer_name=requirement.buyer_name,
        product_name=requirement.product_name,
        required_quantity=requirement.required_quantity,
        unit=requirement.unit,
        budget=requirement.budget,
        location=requirement.location
    )

    db.add(new_requirement)
    db.commit()
    db.refresh(new_requirement)

    return new_requirement


@router.get("/")
def get_requirements(db: Session = Depends(get_db)):
    return db.query(Requirement).all()