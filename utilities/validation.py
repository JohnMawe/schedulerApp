from utilities.time_key import str_to_timestamp, now_timestamp
from utilities.recovery_logger import write_log

def validate_datetime(dateTime):
    if dateTime:
        try:
            dateTime.strip()
            dateTime = str_to_timestamp(dateTime)
            if dateTime <= now_timestamp():
                raise ValueError("Date must be greater or equal to today's date")
            return dateTime
        
        except ValueError as error:
            return str(error)
            
    return None
    
def validate_reminder(reminder):
    if reminder:
        try:
            reminder = int(reminder)
            if reminder < 0:
                raise ValueError("Invalid Value. Reminder should be a number greater than zero")
            return reminder
        
        except ValueError as error:
            return str(error)
    
    return 15
       
def validate_id(id):
    try:
        id = int(id)
        if id <= 0:
            raise ValueError("Invalide Value. ID should be a number greater than zero")
        return id
        
    except ValueError as error:
        return str(error)
        
def validate_string(string):
    if string:
        try:
            string = str(string).strip()
            return string
        
        except Exception as error:
            return error
    
    return None
        