
timezones = [{'id': 5165457498798,
	      'name': 'time_zone_name1',
	      'time_zone': 'Europe/Berlin',
	      'timestamp': 1583071085,
	      'time': ''
	    },{'id': 5165457498799,
	      'name': 'time_zone_name2',
	      'time_zone': 'Europe/Berlin',
	      'timestamp': 1583088085,
	      'time': ''
	    },{'id': 5165457498800,
	      'name': 'time_zone_name3',
	      'time_zone': 'America/Caracas',
	      'timestamp': 1583088085,
	      'time': ''
	    }]

notifications = [  {'id': 3216566666666,
		    'name': 'SOMe NAme1',
		    'comment': 'SOME COMMENTs1',
		    'time_zone': 'Asia/Yakutsk',
		    'timestamp': 1583071085,
		    'time': '1 minute',
		    'status': 'WAITING'}, 
		    {'id': 321777777777,
		    'name': 'SOMe NAme2',
		    'comment': 'SOME COMMENTs2',
		    'time_zone': 'Europe/Berlin',
		    'timestamp': 1583198317,
		    'time': '3 minute',
		    'status': 'FINISHED'},
		    {'id': 321888888,
		    'name': 'SOMe NAme3',
		    'comment': 'SOME COMMENTs3',
		    'time_zone': 'Europe/Berlin',
		    'timestamp': 1583772424,
		    'time': '2 minute',
		    'status': 'PENDING'}]
module.exports = {
    create_notification: function(object) {
      notifications.push(object)
    },
    create_timezone: function(object) {
      timezones.push(object)
    },
    update_notification: function(index, object) {
      notifications[index] = object
    },
    update_timezone: function(index, object) {
      timezones[index] = object
    },
    timezones: function() {
      return timezones
    },
    notifications: function() {
      return notifications
    },
   delete_timezone: function(index) {
      timezones = timezones.slice(0, index).concat(timezones.slice(index + 1, timezones.length))
    },
   delete_notification: function(index) {
      notifications = notifications.slice(0, index).concat(notifications.slice(index + 1, notifications.length))
    }
  };
