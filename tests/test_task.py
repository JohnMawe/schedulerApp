import pytest
from scheduler.task import Task 
from utilities.time_key import str_to_timestamp

def test_create_valid_task():
    task = Task(
            "Study Math",
            str_to_timestamp("2026-05-05 12:00"),
            str_to_timestamp("2026-05-05 17:00"),
            "Topic: Statistics",
            15
        )
    assert task.title == "Study Math"

def test_invalid_time():
    with pytest.raises(ValueError) as error:
        task = Task(
                "Bad Time",
                str_to_timestamp("2026-05-05 12:00"),
                str_to_timestamp("2026-05-05 10:00"),
                "Time Error"
            )
    
    assert "Start time must be before End time" in str(error.value)
    
    
def test_invalid_reminder():
    with pytest.raises(ValueError) as error:
        task =Task(
                "Bad reminder",
                str_to_timestamp("2026-05-05 12:00"),
                str_to_timestamp("2026-05-05 21:00"),
                "Reminder_before error",
                -2
            )
            
        assert "Reminder must be >= 0 minutes" in str(error.value)
