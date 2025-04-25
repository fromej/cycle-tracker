from apiflask import Schema, fields


class PeriodStatsSchema(Schema):
    """Schema for period statistics report."""

    count = fields.Integer(
        required=True,
    )
    min_duration = fields.Integer(
        allow_none=True,
    )
    max_duration = fields.Integer(
        allow_none=True,
    )
    average_duration = fields.Float(
        allow_none=True,
    )


class CycleStatsSchema(Schema):
    """Schema for cycle statistics report."""

    count = fields.Integer(
        required=True,
    )
    min_length = fields.Integer(
        allow_none=True,
    )
    max_length = fields.Integer(
        allow_none=True,
    )
    average_length = fields.Float(
        allow_none=True,
    )


class PredictionSchema(Schema):
    predicted_start = fields.Date(required=True)


class FertileWindowSchema(Schema):
    start = fields.Date(allow_none=True)
    end = fields.Date(allow_none=True)


class CycleContextSchema(Schema):
    status = fields.String(required=True)  # "period" or "waiting"
    current_period_id = fields.Integer(allow_none=True)
    days_running = fields.Integer(allow_none=True)
    cycle_day = fields.Integer(allow_none=True)
    cycle_length = fields.Float(allow_none=True)
    progress_percent = fields.Float(allow_none=True)
    predicted_start = fields.Date(allow_none=True)
    days_until_next_period = fields.Integer(allow_none=True)
    ovulation_date = fields.Date(allow_none=True)
    fertile_window = fields.Nested(FertileWindowSchema, required=True)
    is_today_ovulation = fields.Boolean(required=True)
    is_in_fertile_window = fields.Boolean(required=True)


class OvulationWindowSchema(Schema):
    ovulation_date = fields.Date(required=True)
    fertile_window_start = fields.Date(required=True)
    fertile_window_end = fields.Date(required=True)
