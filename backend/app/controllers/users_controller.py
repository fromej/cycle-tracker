from apiflask import APIBlueprint, EmptySchema, abort
from flask_jwt_extended import current_user, jwt_required

from app.schemas import UserSchema
from app.schemas.user import ChangePasswordSchema

users_bp = APIBlueprint("users", __name__, url_prefix="/users")


@users_bp.route("/me")
@users_bp.output(UserSchema)
@jwt_required()
def get_own_user():
    return current_user


@users_bp.route("/me", methods=["DELETE"])
@users_bp.output(EmptySchema, 204)
@jwt_required()
def delete_own_user():
    return current_user.delete()


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

    from app import UserService

    UserService.update_password(current_user, data["new_password"])
    return
