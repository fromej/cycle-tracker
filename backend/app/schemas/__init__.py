from apiflask import Schema, fields

from .auth import LoginSchema, TokenSchema, UserRegistrationSchema
from .period import PeriodCreateSchema, PeriodSchema, PeriodUpdateSchema
from .report import CycleStatsSchema, PeriodStatsSchema
from .user import UserSchema

__all__ = [
    "UserSchema",
    "UserRegistrationSchema",
    "LoginSchema",
    "TokenSchema",
    "PeriodSchema",
    "PeriodCreateSchema",
    "PeriodUpdateSchema",
    "PeriodStatsSchema",
    "CycleStatsSchema",
    "ErrorSchema",
]


class ErrorSchema(Schema):
    message = fields.String(metadata={"description": "A human-readable error message."})
    detail = fields.Raw(
        allow_none=True, metadata={"description": "Optional additional error details."}
    )
