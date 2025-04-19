import datetime
import json

from flask import url_for

from app.models import Period


def test_get_period_stats_success(auth_client, test_user, db):
    """Test period stats report with data."""
    # Add periods with durations
    Period(
        user_id=test_user.id,
        start_date=datetime.date(2023, 1, 1),
        end_date=datetime.date(2023, 1, 5),
    ).save()  # Duration 5
    Period(
        user_id=test_user.id,
        start_date=datetime.date(2023, 2, 1),
        end_date=datetime.date(2023, 2, 4),
    ).save()  # Duration 4
    Period(
        user_id=test_user.id,
        start_date=datetime.date(2023, 3, 1),
        end_date=datetime.date(2023, 3, 6),
    ).save()  # Duration 6
    # Add one ongoing period (should be ignored by stats)
    Period(user_id=test_user.id, start_date=datetime.date(2023, 4, 1)).save()

    response = auth_client.get(url_for("reports.get_period_statistics"))
    assert response.status_code == 200
    data = response.get_json()

    assert data["count"] == 3
    assert data["min_duration"] == 4
    assert data["max_duration"] == 6
    assert data["average_duration"] == (5 + 4 + 6) / 3  # 5.0


def test_get_period_stats_no_completed_periods(auth_client, test_user, db):
    """Test period stats when only ongoing periods exist."""
    Period(user_id=test_user.id, start_date=datetime.date(2023, 4, 1)).save()

    response = auth_client.get(url_for("reports.get_period_statistics"))
    assert response.status_code == 200
    data = response.get_json()
    assert data["count"] == 0
    assert data["min_duration"] is None
    assert data["max_duration"] is None
    assert data["average_duration"] is None


def test_get_period_stats_no_periods(auth_client):
    """Test period stats when no periods exist."""
    response = auth_client.get(url_for("reports.get_period_statistics"))
    assert response.status_code == 200
    data = response.get_json()
    assert data["count"] == 0
    assert data["min_duration"] is None
    assert data["max_duration"] is None
    assert data["average_duration"] is None


def test_get_cycle_stats_success(auth_client, test_user, db):
    """Test cycle stats report with data."""
    # Need at least two periods, sorted by date
    p1_start = datetime.date(2023, 1, 1)
    p2_start = datetime.date(2023, 1, 30)  # Cycle 1 length = 29 days
    p3_start = datetime.date(2023, 3, 2)  # Cycle 2 length = 31 days
    p4_start = datetime.date(2023, 4, 1)  # Cycle 3 length = 30 days

    Period(
        user_id=test_user.id,
        start_date=p1_start,
        end_date=p1_start + datetime.timedelta(days=4),
    ).save()
    Period(
        user_id=test_user.id,
        start_date=p2_start,
        end_date=p2_start + datetime.timedelta(days=3),
    ).save()
    Period(
        user_id=test_user.id,
        start_date=p3_start,
        end_date=p3_start + datetime.timedelta(days=5),
    ).save()
    Period(
        user_id=test_user.id, start_date=p4_start
    ).save()  # Ongoing, still counts for start date

    response = auth_client.get(url_for("reports.get_cycle_statistics"))
    assert response.status_code == 200
    data = response.get_json()

    assert data["count"] == 3
    assert data["min_length"] == 29
    assert data["max_length"] == 31
    expected_avg = round((29 + 31 + 30) / 3, 2)
    assert data["average_length"] == expected_avg  # 30.0


def test_get_cycle_stats_insufficient_data(auth_client, test_user, db):
    """Test cycle stats with less than two periods."""
    Period(user_id=test_user.id, start_date=datetime.date(2023, 1, 1)).save()

    response = auth_client.get(url_for("reports.get_cycle_statistics"))
    assert response.status_code == 200
    data = response.get_json()
    assert data["count"] == 0
    assert data["min_length"] is None
    assert data["max_length"] is None
    assert data["average_length"] is None


def test_get_cycle_stats_no_periods(auth_client):
    """Test cycle stats with no periods."""
    response = auth_client.get(url_for("reports.get_cycle_statistics"))
    assert response.status_code == 200
    data = response.get_json()
    assert data["count"] == 0
    assert data["min_length"] is None
    assert data["max_length"] is None
    assert data["average_length"] is None


def test_get_reports_unauthorized(client):
    """Test accessing reports without JWT."""
    response_period = client.get(url_for("reports.get_period_statistics"))
    response_cycle = client.get(url_for("reports.get_cycle_statistics"))
    assert response_period.status_code == 401
    assert response_cycle.status_code == 401
