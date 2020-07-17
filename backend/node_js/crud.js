var path = require('path');
var db = require( path.resolve( __dirname, "./db.js" ) );


timezones = db.timezones()
notifications = db.notifications()



const global_reducer = (action, request_type, body) => {
	timezones = db.timezones()
	notifications = db.notifications()
    switch (action) {
        case "create":
            if (request_type == 'timezone'){
                db.create_timezone({"id": Math.round(Math.random() * 1_000_000_000),
                                "name": body["name"] || "default_timezone_name",
                                "time_zone": body["time_zone"] || "UTC",
                                "timestamp": null,
                                "time": "" // updated by backend
                                })

            } else if (request_type == 'notification'){
                 obj = 	          {"id": Math.round(Math.random() * 1_000_000_000),
                                    "name": body["name"] || "default_notification_name",
                                    "comment": body["comment"] || "default_comment_name",
                                    "time_zone": body["time_zone"] || "UTC",
                                    "timestamp": body["timestamp"],
                                    "time": "", // updated by backend
                                    "status": "" // updated by backend
                                    }
		db.create_notification(obj)
            }
        break
        case "update":
            if (request_type == "timezone"){
                for(let i=0; i < timezones.length; i++){
                    if(body["id"] == timezones[i]["id"]){
                        obj	     = {"id": body["id"],
                                        "name": body["name"] || "default_timezone_name",
                                        "time_zone": body["time_zone"] || "UTC",
                                        "timestamp": null, // updated by backend
                                        "time": "" // updated by backend
                        }
			db.update_timezone(i, obj)

                    }
                }
            } else if (request_type == 'notification'){
                for(let i=0; i < notifications.length; i++){
                    if(body["id"] == notifications[i]["id"]){
                        obj		 = {"id": body["id"],
                                            "name": body["name"] || "default_notification_name",
                                            "comment": body["comment"] || "default_comment_name",
                                            "time_zone": body["time_zone"] || "UTC",
                                            "timestamp": body["timestamp"],
                                            "time": "", // updated by backend
                                            "status": "" // updated by backend
                        }
			db.update_notification(i, obj)
                    }
                }
            }
        break
        case 'delete':
            if (request_type == "timezone"){
                for(let i=0; i < timezones.length; i++){
                    if(body["id"] == timezones[i]["id"]){
			db.delete_timezone(i)	
                    } 
                }
            } else if (request_type == 'notification'){
                for(let i=0; i < notifications.length; i++){
                    if(body["id"] == notifications[i]["id"]){
                        db.delete_notification(i)
                    }
                }
            } 
        break

    }
  
}

const parser = (possible_actions, possible_types, request) => {
    try {
        if(!request) throw new Error("Empty Request")
        const parsed_json = JSON.parse(request)
        const action = parsed_json["action"]
        if(possible_actions.includes(action)){
            const object_type = parsed_json["type"]
            if(possible_types.includes(object_type)){
                const object_body = parsed_json["object"]
                // if there's no request body, then do nothing
                //if(object_body && momentTZ.tz.names().includes(object_body["zone"])){
                if(object_body){
                    global_reducer(action, object_type, object_body)
                }
            } else {
                    throw new Error("Object type is not found")
            }
        } else {
            throw new Error("Request method is not found")
        }
    }
    catch(error) {
        console.error(error);
    }
}

module.exports = {
    adapter: function (request){
        POSSIBLE_ACTIONS    = ["delete", "create", "update"]
        POSSIBLE_TYPES      = ["notification", "timezone"]
        parser(POSSIBLE_ACTIONS, POSSIBLE_TYPES, request)
    }
  };
