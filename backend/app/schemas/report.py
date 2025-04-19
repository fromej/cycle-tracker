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

    count = fields.Integer(required=True,)
    min_length = fields.Integer(
        allow_none=True,
    )
    max_length = fields.Integer(
        allow_none=True,
    )
    average_length = fields.Float(
        allow_none=True,
    )
