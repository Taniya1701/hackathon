from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.product import Product
from app.models.requirement import Requirement

from app.services.matching_engine import (
    find_matches,
    allocate_quantity
)

from app.services.collective_order import (
    create_collective_proposal
)


router = APIRouter(
    prefix="/matching",
    tags=["Matching"]
)


@router.post("/{requirement_id}")
def match_requirement(
    requirement_id: int,
    db: Session = Depends(get_db)
):

    # Find requirement
    requirement = db.query(
        Requirement
    ).filter(
        Requirement.id == requirement_id
    ).first()

    if not requirement:

        raise HTTPException(
            status_code=404,
            detail="Requirement not found"
        )

    # Get all products
    products = db.query(Product).all()

    # Find suitable producers
    matches = find_matches(
        products,
        requirement
    )

    # No matches
    if not matches:

        return {
            "message": "No suitable producers found",
            "required_quantity":
                requirement.required_quantity,
            "matched_quantity": 0,
            "fulfillment_percentage": 0,
            "fully_fulfilled": False,
            "suppliers": []
        }

    # Allocate quantity
    match_result = allocate_quantity(
        matches,
        requirement.required_quantity
    )

    # Create collective proposal
    proposal = create_collective_proposal(
        match_result
    )

    return {
        "requirement_id":
            requirement.id,

        "product_name":
            requirement.product_name,

        "required_quantity":
            requirement.required_quantity,

        "matched_quantity":
            match_result["matched_quantity"],

        "remaining_quantity":
            match_result["remaining_quantity"],

        "fulfillment_percentage":
            match_result["fulfillment_percentage"],

        "fully_fulfilled":
            match_result["fully_fulfilled"],

        "suppliers":
            match_result["suppliers"],

        "collective_proposal":
            proposal
    }