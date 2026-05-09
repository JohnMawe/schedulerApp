from scheduler.task_manager import TaskManager
from utilities.time_key import str_to_timestamp
from utilities.helpers import sample_task

# global
def create_task(manager):
    task = sample_task()
    return manager.add_task(task)

def test_add_task(manager):
    result = create_task(manager)
    data = manager.tasks
    
    assert result["success"] is True
    assert len(data) == 1
    assert manager.tasks[0].Id == 1

def test_id_increment(manager):
    create_task(manager)
    create_task(manager)
    
    assert manager.tasks[0].Id == 1
    assert manager.tasks[1].Id == 2
  
def test_remove_task(manager):
    create_task(manager)
    task_id = manager.tasks[0].Id
    removed = manager.remove_task(task_id)
    remove_unknow = manager.remove_task(2)
    
    assert removed["success"] is True
    assert remove_unknow["success"] is False
    
def test_task_update(manager):
    create_task(manager)
    task_Id = manager.tasks[0].Id
    new_start = str_to_timestamp("2026-05-05 12:15")
    new_end = str_to_timestamp("2026-05-05 17:30")
    current_time = str_to_timestamp("2026-05-05 11:30")
    
    updated = manager.update_task(
            task_Id=task_Id,
            new_title = 'Study English',
            new_start_time = new_start,
            new_end_time = new_end,
            new_note = 'Topic: Nouns',
            current_time = current_time
        )
    
    assert updated["success"] is True
    assert manager.tasks[0].title == 'Study English'

def test_modification_rights(manager):
    create_task(manager)
    create_task(manager)
    
    task_Id_1 = manager.tasks[0].Id
    task_Id_2 = manager.tasks[1].Id
    
    new_start = str_to_timestamp("2026-05-05 12:15")
    new_end = str_to_timestamp("2026-05-05 17:30")

    current_time_1 = str_to_timestamp("2026-05-05 12:15")
    current_time_2 = str_to_timestamp("2026-05-05 17:05")
    
    # task in progress
    update_task_1 = manager.update_task(
            task_Id=task_Id_1,
            new_title = 'Study English',
            new_start_time = new_start,
            new_end_time = new_end,
            new_note = 'Topic: Nouns',
            current_time = current_time_1
        )
    
    # task ended        
    update_task_2 = manager.update_task(
            task_Id=task_Id_2,
            new_title = 'Study English',
            new_start_time = new_start,
            new_end_time = new_end,
            new_note = 'Topic: Nouns',
            current_time = current_time_2
        )
        
    assert update_task_1["success"] is False
    assert update_task_2["success"] is False
    
    assert manager.tasks[0].title == "Study Math"
    assert manager.tasks[1].title == "Study Math"
    
def test_corrupt_data_recovery(tmp_path):
    file_path = tmp_path / "tasks.json"
    file_path.write_text("{ broken json")

    manager = TaskManager(filePath=file_path)

    assert manager.tasks == []  
    
    # check if back file exist
    backups = list(tmp_path.glob("*backup*"))
    assert len(backups) == 1
    