import datetime
from statistics import StatisticsError, mean
from typing import Dict, List, Optional, Tuple

from app.extensions import db
from app.models import Period


class ReportService:
    """Service layer for generating cycle and period statistics."""

    @staticmethod
    def get_period_stats(user_id: int) -> Dict[str, Optional[float | int]]:
        """Calculates statistics about period durations for a user."""
        periods_with_duration: List[Period] = (
            Period.query.filter(
                Period.user_id == user_id,
                Period.end_date.isnot(None),  # Only consider completed periods
            )
            .order_by(Period.start_date)
            .all()
        )

        durations: List[int] = [
            p.duration for p in periods_with_duration if p.duration is not None
        ]

        if not durations:
            return {
                "count": 0,
                "min_duration": None,
                "max_duration": None,
                "average_duration": None,
            }

        try:
            avg_duration = round(mean(durations), 2)
        except StatisticsError:
            avg_duration = None  # Should not happen if durations list is not empty, but safety first

        return {
            "count": len(durations),
            "min_duration": min(durations),
            "max_duration": max(durations),
            "average_duration": avg_duration,
        }

    @staticmethod
    def get_cycle_stats(user_id: int) -> Dict[str, Optional[float | int]]:
        """
        Calculates statistics about cycle lengths for a user.
        Cycle length is defined as the time from the start of one period
        to the start of the next period.
        """
        # Fetch all periods sorted by start date to calculate intervals
        periods: List[Period] = (
            Period.query.filter_by(user_id=user_id)
            .order_by(Period.start_date.asc())
            .all()
        )

        if len(periods) < 2:
            # Need at least two periods to calculate one cycle length
            return {
                "count": 0,
                "min_length": None,
                "max_length": None,
                "average_length": None,
            }

        cycle_lengths: List[int] = []
        for i in range(len(periods) - 1):
            start_date_current = periods[i].start_date
            start_date_next = periods[i + 1].start_date
            length = (start_date_next - start_date_current).days
            if length > 0:  # Basic sanity check
                cycle_lengths.append(length)

        if not cycle_lengths:
            return {
                "count": 0,
                "min_length": None,
                "max_length": None,
                "average_length": None,
            }

        try:
            avg_length = round(mean(cycle_lengths), 2)
        except StatisticsError:
            avg_length = None

        return {
            "count": len(cycle_lengths),
            "min_length": min(cycle_lengths),
            "max_length": max(cycle_lengths),
            "average_length": avg_length,
        }
