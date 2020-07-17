import json
import time
from datetime import datetime
from pytz import timezone

from db import db_timezones, db_notifications

TIME_FORMAT = "%H:%M:%S"


async def heartbeat():
    return await tick_update(db_timezones(), db_notifications())


async def tick_update(timezones, notifications):
    ts = time.time()

    for notification in notifications:
        update_notification_status(ts, notification)
        update_notification_time(notification)

    for timezone_ in timezones:
        update_timezones_time(ts, timezone_)

    response = {
        'utc_time':
        datetime.fromtimestamp(ts, timezone('UTC')).strftime(TIME_FORMAT),
        'timezones':
        timezones,
        'notifications':
        notifications
    }

    return json.dumps(response)


def update_notification_time(notification):
    time_zone = notification['time_zone']
    timestamp = notification['timestamp']
    notification['time'] = datetime.fromtimestamp(
        timestamp, timezone(time_zone)).strftime(TIME_FORMAT)


def update_notification_status(time, notification):
    if (notification['timestamp'] < time):
        notification['status'] = 'FINISHED'
    elif ((notification['timestamp'] - time) > 5):
        notification['status'] = 'PENDING'
    elif ((notification['timestamp'] - time) < 5
          and (notification['timestamp'] - time) > 1):
        notification['status'] = 'GET_READY'
    elif ((notification['timestamp'] - time) < 1):
        notification['status'] = 'ACTIVE'


def update_timezones_time(time, time_zone):
    timezone_ = time_zone['time_zone']
    time_zone['timestamp'] = time
    time_zone['time'] = datetime.fromtimestamp(
        time, timezone(timezone_)).strftime(TIME_FORMAT)
