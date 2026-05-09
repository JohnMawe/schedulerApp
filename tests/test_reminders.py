from scheduler.task_manager import TaskManager
from scheduler.reminders import check_reminders
from utilities.time_key import str_to_timestamp
from utilities.helpers import sample_task

# global
def all_tasks(manager):
    task = sample_task()
    manager.add_task(task)
    return manager.tasks

def test_task_reminder_state(manager):
    # get all tasks
    tasks = all_tasks(manager)
    
    current_time = str_to_timestamp("2026-05-05 12:00")
    
    check_reminders(tasks, current_time)
    
    notified = tasks[0].notified
    assert notified["reminder"] is True
    assert notified["in_progress"] is False
    assert notified["completed"] is False

def test_task_inprogress_state(manager):
    tasks = all_tasks(manager)
    
    current_time = str_to_timestamp("2026-05-05 12:20")
        
    check_reminders(tasks, current_time)
    
    notified = tasks[0].notified
    
    assert notified["reminder"] is False
    assert notified["in_progress"] is True
    assert notified["completed"] is False

def test_task_completed_state(manager):
    tasks = all_tasks(manager)
        
    current_time = str_to_timestamp("2026-05-05 17:05")
    
    check_reminders(tasks, current_time)
    
    notified = tasks[0].notified
    
    assert notified["reminder"] is False
    assert notified["in_progress"] is False
    assert notified["completed"] is True

def test_reminder_doesnot_spam(manager):
    tasks = all_tasks(manager)
    current_time = str_to_timestamp("2026-05-05 12:00")
    reminders = check_reminders(tasks, current_time)

    assert len(reminders) is 1
    assert "Reminder" in reminders[0]
    
    reminders = check_reminders(tasks, current_time)

    assert len(reminders) is 0
