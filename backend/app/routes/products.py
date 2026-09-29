from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("/")
def add_product(product: ProductCreate, db: Session = Depends(get_db)):

    new_product = Product(
        producer_name=product.producer_name,
        name=product.name,
        available_quantity=product.available_quantity,
        unit=product.unit,
        price=product.price,
        location=product.location
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@router.get("/")
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()