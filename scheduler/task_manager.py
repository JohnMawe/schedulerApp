import json
from task import Task
from pathlib import Path
from datetime import datetime
from reminders import check_reminders

class TaskManager:
    def __init__(self):
        self.tasks = []
        self.next_Id = 1
        BASE_DIR = Path(__file__).resolve().parent.parent
        self.filePath = BASE_DIR/"data"/"tasks.json"
        self.load_tasks()
    
    def __str__(self):
        if self.tasks:
            print("ID\tTask\t\tCompleted\n")
            total_task = 0
            for task in self.tasks:
                print(f"{task.Id}\t{task.title}\t{"●" if task.completed else "○"}")
                total_task+=1
            return f"Totle task: {total_task}"
                
        else:
            return "No Available Task"
            
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
            return None
        else:
            return [print(task) for task in self.tasks]
            
    
    def update_task(self, task_Id, new_title=None, new_start_time=None, new_end_time=None, new_note=None):
        time_now = datetime.now()
        for task in self.tasks:
            if task.Id == task_Id:
                if task.completed:
                    return f"Completed task can't be edited, Create new one"
                if task.start_time <= time_now < task.end_time:
                        return f"Process can not be edited will in progress, Create a new one"
                if new_title:
                    task.title = new_title
                    
                start = task.start_time
                end = task.end_time
                    
                if new_start_time:
                    start = datetime.strptime(new_start_time, "%Y-%m-%d %H:%M")
                    task.reminded = False
                    
                if new_end_time:
                    end = datetime.strptime(new_end_time, "%Y-%m-%d %H:%M")
                    
                if start >= end:
                    return "Invaled time rage: Start time can't be greater than or equal to end time"
                    
                task.start_time = start
                task.end_time = end
                    
                if new_note:
                    task.note = new_note
                    
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
        data = [task.to_dict() for task in self.tasks]
        with self.filePath.open ("w", encoding='utf-8') as myfile:
            json.dump(data, myfile, indent=4)
  
    def load_tasks(self):
        try:
            with self.filePath.open ('r', encoding="utf-8") as myfile:
                tasks_data = json.load(myfile)
                for task in tasks_data:
                    task = Task(
                        task["title"],
                        task["start_time"],
                        task["end_time"],
                        task["note"],
                        task["completed"],
                        task.get("reminder_before", 0),
                        task.get("reminded"),
                        task.get("Id")
                        )
                    self.tasks.append(task)
            if self.tasks:  
                self.next_Id = max(task.Id for task in self.tasks)+1
            else:
                self.next_Id = 1
            
        except (FileNotFoundError, json.JSONDecoderError) as error:
            self.tasks = []
            self.next_Id = 1

if __name__ == "__main__":
    manager = TaskManager()
    print(manager)
    task1 = Task("Study Math", "2026-04-18 11:05", "2026-04-18 11:10", "Topic to focus on: Statistics", reminder_before=1)
    #print(manager.add_task(task1))
    #manager.get_task()
    #print(manager.update_task(1, new_note="ffff"))
    #print(manager.get_task(1))
    task_Id = [1,2,3,4,5]
    #[print(manager.remove_task(Id)) for Id in task_Id]
    #check_reminders(manager.tasks)
    #manager.save_task()
