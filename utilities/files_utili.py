from pathlib import Path
from datetime import datetime

def backup_file(file_path: Path):
    if not file_path.exists():
        return

    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    backup_name = f"{file_path.stem}_backup_{timestamp}.json"
    backup_path = file_path.with_name(backup_name)

    file_path.rename(backup_path)
    

def cleanup_backups(directory: Path, limit=5):
    backups = sorted(
        directory.glob("*_backup_*.json"),
        key=lambda x: x.stat().st_mtime, 
        reverse=True
    )

    for old_backup in backups[limit:]:
        old_backup.unlink()    
