import pytest
import tempfile
from pathlib import Path
from scheduler.task_manager import TaskManager

@pytest.fixture
def manager():
    with tempfile.TemporaryDirectory() as tmpdir:
        file_path = Path(tmpdir) / "tasks.json"
        yield TaskManager(filePath=file_path)
        