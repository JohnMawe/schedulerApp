import time
from utilities.time_key import str_to_timestamp, now_timestamp
from utilities.helpers import UI_divider
from scheduler.task_manager import TaskManager
from scheduler.reminders import check_reminders
from scheduler.task import Task

def get_datetime():
    while True:
        try:
            dateTime = input("Enter date and time (YYYY-MM-DD HH:MM): ").strip()
            dateTime = str_to_timestamp(dateTime)
            if dateTime <= now_timestamp():
                print("Date must be greater or equal to today's date")
                raise ValueError 
            return dateTime
        
        except ValueError as error:
            print(error)
    
def get_reminder():
    print("Reminder default is 15 minutes") 
    while True:
        try:
            reminder = input("\nRemind me before (Press Enter for Default): ").strip()
            
            if reminder:
                reminder = int(reminder)
                if reminder < 0:
                    raise ValueError
                return reminder
            return 15    
            
        except ValueError:
            print("\nInvalid Value. Reminder should be a number greater the zero")

def get_id():
    while True:
        try:
            task_id = int(input("\nEnter task ID: "))
            return task_id
            
        except ValueError:
            print("\nInvalid Value. ID should be a number") 
 
 #Validate data to update           
def get_new_title():
    print("\nPress Enter to Skip")
    new_title = input("Enter new title: ").strip()
    if new_title:
        return new_title
    return None   
    
def get_new_datetime(string):
    choice = input(f"\nSkip {string} time? (Y/N)").strip()
    if choice.lower() == "n":
        date_time = get_datetime()
        return date_time
    return None
        
def get_new_note():
    print("\nPress Enter to Skip")
    new_note = input("Enter new note: ").strip()
    if new_note:
        return new_note
    return None    


def main():
    manager = TaskManager()

    print("🚀 CLI Scheduler App Runing...\n")

    while True:
        print(UI_divider("Notification"))
        check_reminders(manager.tasks)
        
        print(f"\n{UI_divider("Menu")}")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Update Task")
        print("4. Delete Task")
        print("6. Exit")

        choice = input("\nSelect option: ").strip()

        # Add Task
        if choice == "1":
            print(f"\n{UI_divider("Add Task")}")
            
            title = input("Task Title: ").strip()
            
            while True:
                print("\nStart time >>")
                start = get_datetime()
                print("\nEnd time >>")
                end = get_datetime()
                
                if start < end:
                    break
                else:
                    print("Start time must be before End time. Try again...\n")
                
            note = input("Note: ").strip()
            reminder = get_reminder()

            task = Task(title, start, end, note, reminder)
            try:
                print(manager.add_task(task))
            except ValueError as error:
                print(error)

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
                        task_id = int(input("\nEnter task ID number: "))
                        print(f"\n{manager.get_task(task_id)}")
            
                    except ValueError:
                        print("\nInvalid Value. ID should be a number") 
                    
                elif choice == "2":
                    print(UI_divider("All Tasks"))
                    for task in manager.get_task():
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

            print(f"\n{manager.update_task(
                data['task_Id'], 
                data['new_title'], 
                data['new_start_time'], 
                data['new_end_time'], 
                data['new_note']
            )}")
            
        # Delete Task   
        elif choice == "4":
            task_id = get_id()
            task_removed = manager.remove_task(task_id)
            if task_removed:
                print(f"\nTask {task_id} deleted successfully")
            else:
                print(f"\nTask {task_id} does not exist")
            

        elif choice == "6":
            print("Exiting...")
            break

        manager.save_task()

        time.sleep(1)

if __name__ == "__main__":
    main()