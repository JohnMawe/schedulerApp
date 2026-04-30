from utilities.time_key import str_to_timestamp, timestamp_to_local

class Task:
    def __init__(self, title, start_time, end_time, note,reminder_before=0, Id=None, notified=None):
        self.Id = Id
        self.title = title
        self.start_time = start_time
        self.end_time = end_time

        if self.start_time >= self.end_time:
            raise ValueError("Start time must be before End time")

        self.note = note
        self.reminder_before = reminder_before
        
        if reminder_before < 0:
            raise ValueError("Reminder must be >= 0 minutes")
        
        if notified is None:
            self.notified = {
                "reminder": False,
                "in_progress": False,
                "completed": False
            }
        else:
            self.notified = notified

    def __str__(self):
        local_start_time = timestamp_to_local(self.start_time)
        local_end_time = timestamp_to_local(self.end_time)
        
        start_day = local_start_time.strftime("%a")
        end_day = local_end_time.strftime("%a")
        start_time = local_start_time.strftime("%H:%M")
        end_time = local_end_time.strftime("%H:%M")

        if local_end_time.date() == local_start_time.date():
            return f"Task '{self.title}' begins on {start_day} at {start_time} - {end_time}\nNote: {self.note}"
        else:
            return f"Task '{self.title}' begins on {start_day} {start_time} - {end_day} {end_time}\nNote: {self.note}"

    def to_dict(self):
        return {
            "Id": self.Id,
            "title": self.title,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "reminder_before": self.reminder_before,
            "note": self.note,
            "notified": self.notified
        }
        