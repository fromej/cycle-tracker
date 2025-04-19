import datetime
from typing import Any, Dict, List, Optional

from app.extensions import db
from app.models import Period, User
from app.utils.exceptions import NotFoundError, PeriodLogicError


class PeriodService:
    """Service layer for period tracking logic."""

    @staticmethod
    def record_period_start(user_id: int, start_date: datetime.date) -> Period:
        """Records the start of a new period for a user."""
        # Optional: Check for overlaps or conflicts with existing periods if needed
        # existing = Period.query.filter_by(user_id=user_id).filter(
        #     (Period.start_date <= start_date) & (Period.end_date >= start_date)
        # ).first()
        # if existing:
        #    raise PeriodLogicError("New period overlaps with an existing one.")

        period = Period(user_id=user_id, start_date=start_date)
        try:
            return period.save()
        except Exception as e:
            db.session.rollback()
            # Log e
            raise PeriodLogicError(
                "Could not record period start due to database error."
            ) from e

    @staticmethod
    def update_period_end(
        user_id: int, period_id: int, end_date: datetime.date
    ) -> Period:
        """Updates the end date of an existing period."""
        period = PeriodService.get_period_by_id_for_user(user_id, period_id)

        if not period:
            raise NotFoundError(f"Period with ID {period_id} not found for this user.")

        if period.end_date:
            raise PeriodLogicError(f"Period {period_id} already has an end date.")

        if end_date < period.start_date:
            raise PeriodLogicError("End date cannot be before start date.")

        period.end_date = end_date
        try:
            return period.save()
        except Exception as e:
            db.session.rollback()
            # Log e
            raise PeriodLogicError(
                "Could not update period end date due to database error."
            ) from e

    @staticmethod
    def get_period_by_id_for_user(user_id: int, period_id: int) -> Optional[Period]:
        """Gets a specific period by its ID, ensuring it belongs to the user."""
        return Period.query.filter_by(id=period_id, user_id=user_id).first()

    @staticmethod
    def get_all_periods_for_user(
        user_id: int, page: int = 1, per_page: int = 10
    ) -> List[Period]:
        """Gets a paginated list of all periods for a user, ordered by start date descending."""
        # Using paginate for better handling of large datasets
        pagination = (
            Period.query.filter_by(user_id=user_id)
            .order_by(Period.start_date.desc())
            .paginate(page=page, per_page=per_page, error_out=False)
        )
        return pagination.items  # Or return the pagination object for more info

    @staticmethod
    def delete_period_for_user(user_id: int, period_id: int) -> bool:
        """Deletes a period for a specific user."""
        period = PeriodService.get_period_by_id_for_user(user_id, period_id)
        if not period:
            raise NotFoundError(f"Period with ID {period_id} not found for this user.")

        try:
            period.delete()
            return True
        except Exception as e:
            db.session.rollback()
            # Log e
            raise PeriodLogicError(
                "Could not delete period due to database error."
            ) from e
