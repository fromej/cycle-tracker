from apiflask import APIBlueprint, abort
from flask import jsonify

from app.schemas import LoginSchema, TokenSchema, UserRegistrationSchema, UserSchema
from app.services import AuthService
from app.utils.decorators import validate_schema_with_data
from app.utils.exceptions import AuthenticationError, RegistrationError, ValidationError

auth_bp = APIBlueprint("auth", __name__, url_prefix="/auth")


@auth_bp.route("/register", methods=["POST"])
@auth_bp.input(UserRegistrationSchema, arg_name="validated_data")
@auth_bp.output(UserSchema, 201)
def register(validated_data: dict):
    """
    Register a new user.
    ---
    Body (application/json):
        Required: username, email, password, confirm_password
    Responses:
        201: User created successfully. Returns user data (excluding password).
        400: Invalid input data (e.g., username taken, email taken, passwords don't match).
        422: Validation error (from decorator).
    """
    try:
        # Pass validated data directly to the service
        return AuthService.register_user(validated_data)
    except RegistrationError as e:
        return abort(e.status_code, message=str(e), detail={"error": str(e)})
    except ValidationError as e:
        # This handles validation errors caught *before* the service call if any
        return abort(e.status_code, message=str(e), detail={"error": str(e)})


@auth_bp.route("/login", methods=["POST"])
@auth_bp.input(LoginSchema, arg_name="validated_data")
@auth_bp.output(TokenSchema)
def login(validated_data: dict):
    """
    Log in a user and return a JWT token.
    ---
    Body (application/json):
        Required: login (username or email), password
    Responses:
        200: Login successful. Returns access token.
        401: Invalid credentials.
        422: Validation error (from decorator).
    """
    try:
        access_token = AuthService.login_user(validated_data)
        return {"access_token": access_token}
    except AuthenticationError as e:
        return abort(e.status_code, message=str(e), detail={"error": str(e)})
    except ValidationError as e:
        return abort(e.status_code, message=str(e), detail={"error": str(e)})


# Optional: Add refresh token endpoint if needed
