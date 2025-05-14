from apiflask import Schema, fields
from marshmallow import validate


class UserSchema(Schema):
    """Schema for serializing User data (excluding password)."""

    # Explicitly define fields for clarity or customization if needed
    id = fields.Integer(dump_only=True)
    username = fields.String(required=True, validate=validate.Length(min=3, max=80))
    email = fields.Email(required=True, validate=validate.Length(max=120))
    created_at = fields.DateTime(dump_only=True)


class UserUpdateSchema(Schema):
    """Schema for serializing User update data"""

    username = fields.String(validate=validate.Length(min=3, max=80))
    email = fields.Email(validate=validate.Length(max=120))


class ChangePasswordSchema(Schema):
    """Schema for changing password."""

    current_password = fields.String(required=True)
    new_password = fields.String(required=True)
