from datetime import datetime, timezone, timedelta

FORMAT = "%Y-%m-%d %H:%M"

# convert time now to timestamp
def now_timestamp():
    now = datetime.now(timezone.utc)
    return int(now.timestamp())

# convert datetime string to timestamp in UTC timezone
def str_to_timestamp(date_str):
    local_dt = datetime.strptime(date_str, FORMAT)
    utc_dt = local_dt.astimezone(timezone.utc)
    return int(utc_dt.timestamp())
    
# convert datetime object to timestamp
def datetime_to_timestamp(datetime_obj):
    return int(datetime_obj.timestamp())

# convert timestamp to local datetime object
def timestamp_to_local(timestamp):
    return datetime.fromtimestamp(timestamp)

# convert datetime object to string
def datetime_to_str(dt):
    return dt.strftime(FORMAT)
    
# convert interger to timedelta in minutes
def time_delta(int_minutes):
    return timedelta(minutes=int_minutes)
    

if __name__ == '__main__':
    date = input("Enter date and time ( FORMAT: YYYY-mm-dd HH:MM)")
    if date:
        date = date
        
    else:
        date = "2026-04-27 13:38"
        
    time_stamp = str_to_timestamp(date)
    local_time = timestamp_to_local(time_stamp)
    format_time = format_datetime(local_time)
    print(time_stamp)
    print(local_time)
    print(format_time)