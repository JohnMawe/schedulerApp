from datetime import datetime, timedelta

def check_reminders(tasks):
    time_now = datetime.now()

    for task in tasks:

        reminder_time = task.start_time - timedelta(minutes=task.reminder_before)

        # 🔔 reminder
        if reminder_time <= time_now < task.start_time:
            if not task.notified["reminder"]:
                print(f"⏰ Reminder: {task.title} starts at {task.start_time}")
                task.notified["reminder"] = True

        # ▶ in progress
        elif task.start_time <= time_now < task.end_time:
            if not task.notified["in_progress"]:
                print(f"▶ {task.title} in progress, ends at {task.end_time}")
                task.notified["in_progress"] = True

        # ✅ completed
        elif task.end_time <= time_now:
            if not task.notified["completed"]:
                print(f"✅ {task.title} has ended")
                task.notified["completed"] = True
                

