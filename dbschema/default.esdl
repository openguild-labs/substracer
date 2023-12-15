module default {
  abstract type TimeRecord {
    created_at: datetime {
        default := datetime_current();
    }
    updated_at: datetime {
            default := datetime_current();
            rewrite update using (
                datetime_of_statement()
                if not __specified__.updated_at
                else .updated_at
            )
        }
  }
};