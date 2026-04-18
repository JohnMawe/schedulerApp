from datetime import datetime, timedelta

def check_reminders(tasks):
    time_now = datetime.now()

    for task in tasks:
        if task.completed:
            continue
        
        reminder_time = task.start_time - timedelta(minutes=task.reminder_before)
        
        if reminder_time <= time_now < task.start_time:
            if not getattr(task, "reminded", False):
                print(f"⏰️Reminder: {task.title} starts at {task.start_time}")
                task.reminded = True
            
        elif task.start_time < time_now < task.end_time:
                print(f"{task.title} in progress, ends at {task.end_time}")
        
        elif time_now >= task.end_time:
                print(f"{task.title} has ended")
                task.completed = True
                

