from scheduler.task import Task
from utilities.time_key import str_to_timestamp

def UI_divider(title):
    return f"{'-'*15} {title} {'-'*16}"
    
def fail_message(message:str, data=None):
    return {
        "success": False,
        "message": message,
        "data": data
    }

def success_message(message: str, data=None):
    return {
        "success": True,
        "message": message,
        "data": data
    }
  
def sample_task():
    task = Task(
            "Study Math",
            str_to_timestamp("2026-05-05 12:05"),
            str_to_timestamp("2026-05-05 17:00"),
            "Topic: Statistics",
            5
        )
    return task