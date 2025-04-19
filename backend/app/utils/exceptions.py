class BaseAppException(Exception):
    """Base class for application-specific exceptions."""

    status_code = 500
    message = "An unexpected error occurred."

    def __init__(self, message: str | None = None, status_code: int | None = None):
        super().__init__(message or self.message)
        if status_code is not None:
            self.status_code = status_code

    def to_dict(self):
        return {"error": self.args[0]}


class RegistrationError(BaseAppException):
    """Exception raised for errors during user registration."""

    status_code = 400  # Bad Request or 409 Conflict might also fit


class AuthenticationError(BaseAppException):
    """Exception raised for failed login attempts."""

    status_code = 401  # Unauthorized


class PeriodLogicError(BaseAppException):
    """Exception raised for invalid operations on periods."""

    status_code = 400  # Bad Request


class NotFoundError(BaseAppException):
    """Exception raised when a resource is not found."""

    status_code = 404  # Not Found


class ValidationError(BaseAppException):
    """Exception raised for schema validation errors (can wrap Marshmallow errors)."""

    status_code = 422  # Unprocessable Entity
    payload = None

    def __init__(
        self,
        message: str | None = None,
        status_code: int | None = None,
        payload: dict | None = None,
    ):
        super().__init__(message or "Validation failed", status_code)
        self.payload = payload

    def to_dict(self):
        rv = {"error": self.args[0]}
        if self.payload:
            rv["messages"] = self.payload
        return rv
