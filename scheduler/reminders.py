from utilities.time_key import timestamp_to_local, now_timestamp, datetime_to_timestamp, time_delta

def check_reminders(tasks):
    time_now = now_timestamp()

    for task in tasks:
        local_end_time = timestamp_to_local(task.end_time)
        local_start_time = timestamp_to_local(task.start_time)
        
        reminder_time = local_start_time - time_delta(task.reminder_before)
        #convert to timestamp
        reminder_time = datetime_to_timestamp(reminder_time)

        # 🔔 reminder
        if reminder_time <= time_now < task.start_time:
            if not task.notified["reminder"]:
                print(f"⏰ Reminder: {task.title} starts at {local_start_time}")
                task.notified["reminder"] = True

        # ▶ in progress
        elif task.start_time <= time_now < task.end_time:
            if not task.notified["in_progress"]:
                print(f"▶ {task.title} in progress, ends at {local_end_time}")
                task.notified["in_progress"] = True

        # ✅ completed
        elif task.end_time <= time_now:
            if not task.notified["completed"]:
                print(f"✅ {task.title} has ended")
                task.notified["completed"] = True
                