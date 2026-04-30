import json
from scheduler.task import Task
from pathlib import Path
#from reminders import check_reminders
from utilities.time_key import now_timestamp
from utilities.files_utili import backup_file, cleanup_backups

class TaskManager:
    def __init__(self):
        self.tasks = []
        self.next_Id = 1
        BASE_DIR = Path(__file__).resolve().parent.parent
        self.filePath = BASE_DIR/"data"/"tasks.json"
        self.load_tasks()
    
    def __str__(self):
        if not self.tasks:
            return "\nNo Available Task"
    
        lines = ["ID\tTask\t\tCompleted"]
        for task in self.tasks:
            status = "■" if task.notified["completed"] else "□"
            lines.append(f"{task.Id}\t{task.title}\t\t{status}")
        lines.append(f"\nTotal tasks: {len(self.tasks)}")
        return "\n".join(lines)
            
    def add_task(self, task):
        task.Id = self.next_Id
        self.tasks.append(task)
        self.next_Id += 1
        self.save_task()
        return "Task saved successfully"
  
    def get_task(self, task_Id=None):
        if task_Id:
            for task in self.tasks:
                if task.Id == task_Id:
                    return task
            return f"Error: Task with ID: {task_Id} dose not exist"
        else:
            return self.tasks
            
   
    def update_task(self, task_Id, new_title=None, new_start_time=None, new_end_time=None, new_note=None):
        time_now = now_timestamp()
        
        for task in self.tasks:
            if task.Id == task_Id:
                if time_now >= task.end_time:
                    return "Error: Task completed can't be modified."
                elif task.start_time <= time_now < task.end_time:
                    return "Error: Task in progress can't be modified."
                
                if new_title:
                    task.title = new_title

                if new_start_time:
                    task.start_time = new_start_time
                    
                    task.notified = {
                        "reminder": False,
                        "in_progress": False,
                        "completed": False
                    }

                if new_end_time:
                    task.end_time = new_end_time

                if new_note:
                    task.note = new_note

                if task.start_time >= task.end_time:
                    return "Invalid time range"

                self.save_task()
                return "Task updated successfully"

        return f"{task_Id} does not exist"
        
  
    def remove_task(self, task_Id):
        for task in self.tasks:
            if task.Id == task_Id:
                self.tasks.remove(task)
                self.save_task()
                return True
        return False
  
    def save_task(self):
        self.filePath.parent.mkdir(parents=True, exist_ok=True)
        temp_file = self.filePath.with_suffix(".temp")
        
        if temp_file.exists():
            temp_file.unlink()
        
        data = [task.to_dict() for task in self.tasks]
        try:
            with temp_file.open ("w", encoding='utf-8') as myfile:
                json.dump(data, myfile, indent=4)
            temp_file.replace(self.filePath)
        except Exception as error:
            print("Faield to Save", error)
            
    def _create_empty_file(self):
        self.filePath.parent.mkdir(parents=True, exist_ok=True)
        with self.filePath.open("w", encoding="utf-8") as myfile:
            myfile.write("[]")
                
    def load_tasks(self):
        try:
            with self.filePath.open('r', encoding="utf-8") as myfile:
                tasks_data = json.load(myfile)

                for tsk in tasks_data:
                    task = Task(
                        tsk["title"],
                        tsk["start_time"],
                        tsk["end_time"],
                        tsk["note"],
                        tsk.get("reminder_before", 0),
                        tsk.get("Id"),
                        tsk.get("notified", {
                            "reminder": False,
                            "in_progress": False,
                            "completed": False
                        })
                    )
                    self.tasks.append(task)
            
            self.next_Id = max([tsk.Id for tsk in self.tasks], default=0) + 1

        except (FileNotFoundError, json.JSONDecodeError):
            try:
                backup_file(self.filePath)
                cleanup_backups(self.filePath.parent)
                self._create_empty_file()
            except Exception as error:
                print("Backup Faield", error)
            self.tasks = []
            self.next_Id = 1
  

if __name__ == "__main__":
    manager = TaskManager()
    print(manager)
    task1 = Task("Study Math", "2026-04-21 17:44", "2026-04-21 17:55", "Topic to focus on: Statistics", reminder_before=1)
    #print(manager.add_task(task1))
    #for task in manager.get_task():
        #print(task)
    #print(manager.update_task(8, new_title="fkff"))
    #print(manager.get_task(1))
    task_Id = [1,2,3,4,5,6,7]
    #[print(manager.remove_task(Id)) for Id in task_Id]
    #check_reminders(manager.tasks)
    #manager.save_task()
    
