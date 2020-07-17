const path = require('path');
const db = require( path.resolve( __dirname, "./db.js" ) );




//update notifications and timezones status' every second
const tick_update = () => {
	const timezones = db.timezones()
	const notifications = db.notifications()
    const ts = Date.now() / 1_000
    notifications.map((notification) => {
        update_notification_status(ts, notification)
        update_notification_time(notification)
    })
    timezones.map((timezone_) => {

        update_timezones_time(ts, timezone_) 
    })
    const response = {'utc_time': new Date(Date.now()).toLocaleTimeString('gb-GB', {timeZone: 'UTC'}),
                'timezones': timezones,
                'notifications': notifications}
    return JSON.stringify(response)
}

const update_notification_time = (notification) =>{
    const time_zone_str = notification['time_zone']
    const timestamp = notification['timestamp']
    //https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    notification['time'] = new Date(timestamp * 1_000).toLocaleTimeString('gb-GB', {timeZone: time_zone_str})
}

const update_notification_status =(time, notification) => {
    if(notification['timestamp'] < time)
        notification['status'] = 'FINISHED'
    else if((notification['timestamp'] - time) > 5)
        notification['status'] = 'PENDING'
    else if((notification['timestamp'] - time) < 5 && (notification['timestamp'] - time) > 1)
        notification['status'] = 'GET_READY'
    else if((notification['timestamp'] - time) < 1 )
        notification['status'] = 'ACTIVE'
}

const update_timezones_time = (time_actual, time_zone) => {
    const timezone_str = time_zone['time_zone']
    time_zone['timestamp'] = time_actual
    time_zone['time'] = new Date(time_actual* 1_000).toLocaleTimeString('gb-GB', {timeZone: timezone_str})
} 

module.exports = {
    heartbeat: function () {
        return tick_update()
    }
  };
