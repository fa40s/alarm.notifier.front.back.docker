import pytz
import json
import random

from db import db_timezones, db_notifications, create_notification, create_timezone, update_notifications, update_timezones, delete_notification, delete_timezone

POSSIBLE_ACTIONS = ["delete", "create", "update"]
POSSIBLE_TYPES = ["notification", "timezone"]


async def adapter(request):
    await parser(POSSIBLE_ACTIONS, POSSIBLE_TYPES, request)


async def parser(possible_actions, possible_types, request):
    try:
        parsed_json = json.loads(request)
        action = parsed_json["action"]
        if action in possible_actions:
            object_type = parsed_json["type"]
            if object_type in possible_types:
                object_body = parsed_json["object"]
                if object_body:
                    await global_reducer(action, object_type, object_body)
            else:
                raise TypeError("Object type is not found")
        else:
            raise TypeError("Request method is not found")
    except Exception as e:
        print('Exception:' + str(e))


async def global_reducer(action, request_type, body):
    from db import db_timezones, db_notifications
    timezones = db_timezones()
    notifications = db_notifications()
    if action == "create":
        if request_type == 'timezone':
            create_timezone({
                "id": round(random.random() * 1_000_000_000),
                "name": body["name"] or "default_timezone_name",
                "time_zone": body["time_zone"] or "UTC",
                "timestamp": None,
                "time": ""
            })
        elif request_type == 'notification':
            create_notification({
                "id": round(random.random() * 1_000_000_000),
                "name": body["name"] or "default_notification_name",
                "comment": body["comment"] or "default_comment_name",
                "time_zone": body["time_zone"] or "UTC",
                "timestamp": body["timestamp"],
                "time": "",
                "status": ""
            })
    elif action == "update":
        if request_type == 'timezone':
            for i in range(len(timezones)):
                if body["id"] == timezones[i]["id"]:
                    update_timezones(
                        i, {
                            "id": body["id"],
                            "name": body["name"] or "default_timezone_name",
                            "time_zone": body["time_zone"] or "UTC",
                            "timestamp": None,
                            "time": ""
                        })
        elif request_type == 'notification':
            for i in range(len(notifications)):
                if body["id"] == notifications[i]["id"]:
                    update_notifications(
                        i, {
                            "id": body["id"],
                            "name": body["name"]
                            or "default_notification_name",
                            "comment": body["comment"]
                            or "default_comment_name",
                            "time_zone": body["time_zone"] or "UTC",
                            "timestamp": body["timestamp"],
                            "time": "",
                            "status": ""
                        })
    elif action == "delete":
        if request_type == 'timezone':
            for timezone in timezones:
                if timezone["id"] == body["id"]:
                    delete_timezone(timezone)
        elif request_type == 'notification':
            for notification in notifications:
                if notification["id"] == body["id"]:
                    delete_notification(notification)
