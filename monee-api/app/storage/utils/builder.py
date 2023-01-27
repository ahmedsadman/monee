from datetime import date
from app.db import Base


class FilterBuilder:
    def __init__(self, model: Base):
        self.query_filters = []
        self.model = model

    def add_date_filters(self, start_date: date | None, end_date: date | None):
        if not start_date or not end_date:
            return self

        self.query_filters.append(self.model.date >= start_date)
        self.query_filters.append(self.model.date <= end_date)

        return self

    def get(self):
        return self.query_filters
