from apiflask import APIBlueprint, EmptySchema, abort
from flask_jwt_extended import current_user, jwt_required

from app.schemas import UserSchema
from app.schemas.user import ChangePasswordSchema, UserUpdateSchema
from app.services import UserService

users_bp = APIBlueprint("users", __name__, url_prefix="/users")


@users_bp.route("/me")
@users_bp.output(UserSchema)
@jwt_required()
def get_own_user():
    return current_user


@users_bp.route("/me", methods=["PATCH"])
@users_bp.input(UserUpdateSchema)
@users_bp.output(UserSchema)
@jwt_required()
def patch_own_user(json_data: dict):
    user = None
    if "username" in json_data:
        user = UserService.get_user_by_username(json_data.get("username"))
    if "email" in json_data:
        user = UserService.get_user_by_email(json_data.get("email"))
    if user and user != current_user:
        abort(400, message="A user like that already exists")
    return UserService.update_user(current_user, json_data)


@users_bp.route("/me", methods=["DELETE"])
@users_bp.output(EmptySchema, 204)
@jwt_required()
def delete_own_user():
    return UserService.delete_user(current_user)


@users_bp.route("me/change-password", methods=["POST"])
@users_bp.input(ChangePasswordSchema, arg_name="data")
@users_bp.output(EmptySchema, 200)
@jwt_required()
def change_own_password(data):
    if not current_user.check_password(data["current_password"]):
        abort(
            400,
            message="Current password does not match",
            detail={"error": "password error"},
        )
    UserService.update_password(current_user, data["new_password"])
    return
