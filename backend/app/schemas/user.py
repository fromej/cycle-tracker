from apiflask import fields, Schema
from marshmallow import validate


class UserSchema(Schema):
    """Schema for serializing User data (excluding password)."""

    # Explicitly define fields for clarity or customization if needed
    id = fields.Integer(dump_only=True)
    username = fields.String(required=True, validate=validate.Length(min=3, max=80))
    email = fields.Email(required=True, validate=validate.Length(max=120))
    created_at = fields.DateTime(dump_only=True)
