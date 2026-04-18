from datetime import datetime

class Task:
  def __init__(self, title, start_time, end_time, note, completed=False, reminder_before=0, reminded=False, Id=None):
    self.Id = Id
    self.title = title
    self.start_time = datetime.strptime(start_time, "%Y-%m-%d %H:%M")
    self.end_time = datetime.strptime(end_time, "%Y-%m-%d %H:%M")
    #Validate time rage
    if self.start_time >= self.end_time:
        raise ValueError("Start time must be before End time")
        
    self.note = note
    self.completed = completed
    self.reminder_before = reminder_before
    self.reminded = reminded
    
  def __str__(self):
    status = "●" if self.completed else "○"
    
    start_day = self.start_time.strftime("%a")
    end_day = self.end_time.strftime("%a")
    start_time = self.start_time.strftime("%H:%M")
    end_time = self.end_time.strftime("%H:%M")
    
    if self.end_time.date() == self.start_time.date():
      return f"{status} {self.title} on {start_day} at {start_time} - {end_time}"
    else:
      return f"{status} {self.title} on {start_day} {start_time} - {end_day} {end_time}"
     
  def to_dict(self):
    return{
      "Id": self.Id,
      "title": self.title,
      "start_time": self.start_time.strftime("%Y-%m-%d %H:%M"),
      "end_time": self.end_time.strftime("%Y-%m-%d %H:%M"),
      "reminder_before": self.reminder_before,
      "reminded": self.reminded,
      "note": self.note,
      "completed": self.completed
    }
      

if __name__ == "__main__":
  task1 = Task("Study Math", "2026-04-11 07:00", "2026-04-15 08:00", "Topic to focus on: Statistics")
  print(task1)
  