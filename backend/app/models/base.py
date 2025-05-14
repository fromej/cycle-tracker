import datetime
from typing import TypeVar

from app.extensions import db

T = TypeVar("T", bound="BaseModel")


class BaseModel(db.Model):
    """Abstract base model with common fields."""

    __abstract__ = True  # Tells SQLAlchemy not to create a table for BaseModel

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def save(self: T) -> T:
        """Saves the current instance to the database."""
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self: T) -> None:
        """Deletes the current instance from the database."""
        db.session.delete(self)
        db.session.commit()

    def update(self: T, **kwargs) -> T:
        """Update the current instance in the database"""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        db.session.commit()
        return self

    @classmethod
    def get_by_id(cls: type[T], record_id: int) -> T | None:
        """Gets a record by its primary key."""
        return db.session.get(cls, record_id)
