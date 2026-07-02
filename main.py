import time
from utilities.helpers import UI_divider
from scheduler.task_manager import TaskManager
from scheduler.reminders import check_reminders
from scheduler.task import Task
from utilities.validation import validate_datetime, validate_id, validate_reminder, validate_string

# Get all user data safely
def get_datetime():
    while True:
        try:
            dateTime = input("Enter date and time (YYYY-MM-DD HH:MM): ").strip()
            dateTime = validate_datetime(dateTime)
        
            if not isinstance(dateTime, int):
                raise ValueError(dateTime)
            
            return dateTime
        
        except ValueError as error:
            print(error)
            
def get_reminder():
    print("Reminder default is 15 minutes") 
    while True:
        try:
            reminder = input("\nRemind me before (Press Enter for Default): ").strip()
            reminder = validate_reminder(reminder)
            if not isinstance(reminder, int):
                raise ValueError
            return reminder
                
        except ValueError:
            print("\nInvalid Value. Reminder should be a number greater than zero")

def get_id():
    while True:
        try:
            task_id = input("\nEnter task ID: ")
            task_id = validate_id(task_id)
            
            if not task_id:
                raise ValueError("Value required")
            if not isinstance(task_id, int):
                raise ValueError
            return task_id
            
        except ValueError:
            print("\nInvalid Value. ID should be a number") 

def get_title():
    while True:
        title = input("Enter title: ")
        title = validate_string(title)
        if not isinstance(title, str):
            print(str(title))
            
        return title
        

def get_note():
    while True:
        note = input("Note: ")
        note = validate_string(note)
        if not isinstance(note, str):
            print(str(note))
        
        return note
        

 #Validate data to update           
def get_new_title():
    print("\nPress Enter to Skip")
    return get_title()
    
def get_new_datetime(string):
    choice = input(f"\nSkip {string} time? (Y/N)").strip()
    if choice.lower() == "n":
        date_time = get_datetime()
        return date_time
    return None
        
def get_new_note():
    print("\nPress Enter to Skip")
    return get_note()

#=================== M A I N ========================
def main():
    manager = TaskManager()

    print("🚀 CLI Scheduler App Runing...\n")

    while True:
        print(UI_divider("Notification"))
        
        all_task = manager.tasks
        
        print("0. Check Notification\n")
        reminder = check_reminders(all_task)
        notifications = reminder["data"]
        for notification in notifications:
            print(notification)
        
        print(f"\n{UI_divider("Menu")}")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Update Task")
        print("4. Delete Task")
        print("6. Exit")

        choice = input("\nSelect option: ").strip()
        
        # Notification
        if choice == "0":
            if notifications:
                for notification in notifications:
                    print(notification)
            else:
                print("\nNo Available Notification")
        

        # Add Task
        if choice == "1":
            print(f"\n{UI_divider("Add Task")}")
            
            title = get_title()
            note = get_note()
            
            while True:
                print("\nSTART >>>")
                start = get_datetime()
    
                print("\nEND >>>")
                end = get_datetime()
                
                if start < end:
                    break
                else:
                    print("Start time must be before End time. Try again...\n")
                    
            reminder = get_reminder()

            task = Task(title, start, end, note, reminder)
            add_task = manager.add_task(task)
            if add_task["success"]:
                print(add_task["message"])
            else:
                print(add_task["message"])

        # View Task
        elif choice == "2":
            print(manager)
            
            while True:
                print("\n\t1. Task Details")
                print("\t2. All Task Details")
                print("\t3. Exit")
                
                choice = input("\tSelect option: ").strip()
                
                if choice == "1":
                    try:
                        task_id = get_id()
                        get_task = manager.get_task(task_id)
                        if get_task["success"]:
                            print(f"{get_task['message']}\n{get_task['CLI_data']}")
                        else:
                            print(get_task["message"])
            
                    except ValueError as error:
                        print(f"\n{error}" ) 
                    
                elif choice == "2":
                    get_task = manager.get_task()
                    all_task = get_task["CLI_data"]
                    print(UI_divider("All Tasks"))
                    for task in all_task:
                        print(f"\n{task}")
                        
                elif choice == "3":
                    print("Back to main menu...")
                    break

        # Update Task
        elif choice == "3":
            data = {
                "task_Id": get_id(),
                "new_title": get_new_title(),
                "new_start_time": get_new_datetime("Start"),
                "new_end_time": get_new_datetime("End"),
                "new_note": get_new_note()
            }

            task_updated = manager.update_task(
                data['task_Id'], 
                data['new_title'], 
                data['new_start_time'], 
                data['new_end_time'], 
                data['new_note']
            )
            if task_updated["success"]:
                print(f"\n{task_updated['message']}")
            else:
                print(f"\n{task_updated['message']}")
            
        # Delete Task   
        elif choice == "4":
            task_id = get_id()
            task_removed = manager.remove_task(task_id)
            if task_removed["success"]:
                print(f"\n{task_removed['message']}")
            else:
                print(f"\n{task_removed['message']}")
            

        elif choice == "6":
            print("Exiting...")
            break

        manager.save_task()

        time.sleep(1)

if __name__ == "__main__":
    main()
    