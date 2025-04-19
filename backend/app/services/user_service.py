from typing import Optional

from app.models import User


class UserService:
    """Service layer for user-related operations."""

    @staticmethod
    def get_user_by_id(user_id: int) -> Optional[User]:
        """Finds a user by their ID."""
        return User.get_by_id(user_id)

    @staticmethod
    def get_user_by_email(email: str) -> Optional[User]:
        """Finds a user by their email."""
        return User.find_by_email(email)

    @staticmethod
    def get_user_by_username(username: str) -> Optional[User]:
        """Finds a user by their username."""
        return User.find_by_username(username)

    @staticmethod
    def get_user_by_login(login: str) -> Optional[User]:
        """Finds a user by either email or username."""
        user = User.find_by_email(login)
        if not user:
            user = User.find_by_username(login)
        return user
