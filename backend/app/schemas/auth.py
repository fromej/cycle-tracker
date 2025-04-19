from apiflask import Schema, fields
from marshmallow import ValidationError, validate, validates_schema


class UserRegistrationSchema(Schema):
    """Schema for validating user registration requests."""

    username = fields.String(required=True, validate=validate.Length(min=3, max=80))
    email = fields.Email(required=True, validate=validate.Length(max=120))
    password = fields.String(
        required=True,
        load_only=True,  # Never dump password
        validate=validate.Length(
            min=8, error="Password must be at least 8 characters long."
        ),
    )
    confirm_password = fields.String(required=True, load_only=True)

    @validates_schema
    def validate_password_match(self, data, **kwargs):
        """Ensure password and confirm_password match."""
        if data.get("password") != data.get("confirm_password"):
            raise ValidationError("Passwords do not match.")


class LoginSchema(Schema):
    """Schema for validating login requests."""

    # Allow login with either email or username
    login = fields.String(required=True)  # Client sends 'login' field
    password = fields.String(required=True, load_only=True)


class TokenSchema(Schema):
    """Schema for serializing JWT access tokens."""

    access_token = fields.String(required=True)
