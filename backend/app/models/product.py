from sqlalchemy import Column, Integer, String, Float
from app.database.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    producer_name = Column(String)
    name = Column(String)
    available_quantity = Column(Float)
    unit = Column(String)
    price = Column(Float)
    location = Column(String)