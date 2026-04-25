from datetime import datetime

class Task:
    def __init__(self, title, start_time, end_time, note,reminder_before=0, Id=None, notified=None):
        self.Id = Id
        self.title = title
        self.start_time = datetime.strptime(start_time, "%Y-%m-%d %H:%M")
        self.end_time = datetime.strptime(end_time, "%Y-%m-%d %H:%M")

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
        start_day = self.start_time.strftime("%a")
        end_day = self.end_time.strftime("%a")
        start_time = self.start_time.strftime("%H:%M")
        end_time = self.end_time.strftime("%H:%M")

        if self.end_time.date() == self.start_time.date():
            return f"Task '{self.title}' begins on {start_day} at {start_time} - {end_time}\nNote: {self.note}"
        else:
            return f"Task '{self.title}' begins on {start_day} {start_time} - {end_day} {end_time}\nNote: {self.note}"

    def to_dict(self):
        return {
            "Id": self.Id,
            "title": self.title,
            "start_time": self.start_time.strftime("%Y-%m-%d %H:%M"),
            "end_time": self.end_time.strftime("%Y-%m-%d %H:%M"),
            "reminder_before": self.reminder_before,
            "note": self.note,
            "notified": self.notified
        }