from sqlalchemy import Column, Integer, String, Float
from app.database.database import Base


class Requirement(Base):
    __tablename__ = "requirements"

    id = Column(Integer, primary_key=True, index=True)
    buyer_name = Column(String)
    product_name = Column(String)
    required_quantity = Column(Float)
    unit = Column(String)
    budget = Column(Float)
    location = Column(String)