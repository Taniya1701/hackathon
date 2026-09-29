from fastapi import FastAPI

from app.database.database import Base, engine

from app.models.product import Product
from app.models.requirement import Requirement

from app.routes.products import router as product_router
from app.routes.requirements import router as requirement_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SheSupply API"
)


app.include_router(product_router)
app.include_router(requirement_router)


@app.get("/")
def home():
    return {
        "message": "SheSupply Backend is running!"
    }