from apiflask import APIBlueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.schemas import LoginSchema, TokenSchema, UserRegistrationSchema, UserSchema
from app.schemas.auth import AccessTokenSchema
from app.services import AuthService
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
        return AuthService.login_user(validated_data)
    except AuthenticationError as e:
        return abort(e.status_code, message=str(e), detail={"error": str(e)})
    except ValidationError as e:
        return abort(e.status_code, message=str(e), detail={"error": str(e)})


@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
@auth_bp.output(AccessTokenSchema, status_code=200)
def refresh():
    """
    Refresh an access token.
    Requires a valid refresh token in the Authorization header (Bearer <refresh_token>).
    ---
    Responses:
        200: Access token refreshed successfully. Returns new access token.
        401: Missing or invalid refresh token.
        422: Token is not a refresh token.
    """
    current_user_identity = get_jwt_identity()  # Get identity from the refresh token
    new_access_token = AuthService.refresh_access_token(identity=current_user_identity)
    return {"access_token": new_access_token}
