timezones = [{
    'id': 5165457498798,
    'name': 'time_zone_name1',
    'time_zone': 'Europe/Berlin',
    'timestamp': 1583071085,
    'time': ''
}, {
    'id': 5165457498799,
    'name': 'time_zone_name2',
    'time_zone': 'Europe/Berlin',
    'timestamp': 1583088085,
    'time': ''
}, {
    'id': 5165457498800,
    'name': 'time_zone_name3',
    'time_zone': 'America/Caracas',
    'timestamp': 1583088085,
    'time': ''
}]

notifications = [{
    'id': 3216566666666,
    'name': 'SOMe NAme1',
    'comment': 'SOME COMMENTs1',
    'time_zone': 'Asia/Yakutsk',
    'timestamp': 1583071085,
    'time': '1 minute',
    'status': 'WAITING'
}, {
    'id': 321777777777,
    'name': 'SOMe NAme2',
    'comment': 'SOME COMMENTs2',
    'time_zone': 'Europe/Berlin',
    'timestamp': 1583198317,
    'time': '3 minute',
    'status': 'FINISHED'
}, {
    'id': 321888888,
    'name': 'SOMe NAme3',
    'comment': 'SOME COMMENTs3',
    'time_zone': 'Europe/Berlin',
    'timestamp': 1583772424,
    'time': '2 minute',
    'status': 'PENDING'
}]


def db_timezones():
    return timezones


def db_notifications():
    return notifications


def create_notification(notification):
    notifications.append(notification)


def create_timezone(timezone):
    timezones.append(timezone)


def update_notifications(index, notification):
    notifications[index] = notification


def update_timezones(index, timezone):
    timezones[index] = timezone


def delete_timezone(timezone):
    timezones.remove(timezone)


def delete_notification(notification):
    notifications.remove(notification)
