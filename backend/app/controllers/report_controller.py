from apiflask import APIBlueprint
from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.schemas import CycleStatsSchema, PeriodStatsSchema
from app.services import ReportService

report_bp = APIBlueprint("reports", __name__, url_prefix="/reports")


@report_bp.route("/period-stats", methods=["GET"])
@report_bp.output(PeriodStatsSchema)
@jwt_required()
def get_period_statistics():
    """
    Get statistics about the logged-in user's period durations.
    Calculates min, max, and average duration based on completed periods.
    ---
    Security: JWT Bearer Token required.
    Responses:
        200: Statistics returned successfully.
        401: Unauthorized.
    """
    user_id = get_jwt_identity()
    return ReportService.get_period_stats(user_id)


@report_bp.route("/cycle-stats", methods=["GET"])
@report_bp.output(CycleStatsSchema)
@jwt_required()
def get_cycle_statistics():
    """
    Get statistics about the logged-in user's cycle lengths.
    Calculates min, max, and average cycle length (start date to next start date).
    ---
    Security: JWT Bearer Token required.
    Responses:
        200: Statistics returned successfully.
        401: Unauthorized.
    """
    user_id = get_jwt_identity()
    return ReportService.get_cycle_stats(user_id)
