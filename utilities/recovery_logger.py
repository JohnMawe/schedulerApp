from pathlib import Path
from utilities.time_key import now_timestamp

BASE_DIR = Path(__file__).resolve().parent.parent
LOG_DIR = BASE_DIR / "logs"
LOG_FILE = LOG_DIR / "recovery.log"


def write_log(level, message):
    LOG_DIR.mkdir(parents=True, exist_ok=True)

    timestamp = now_timestamp()

    log_message = f"{timestamp} | {level.upper()} | {message}\n"
    print(log_message)
    
    try:
        with LOG_FILE.open("a", encoding="utf-8") as log_file:
            log_file.write(log_message)
    
    except Exceptiona as error:
        print(f"Log error occured {error}")
        