export default (state, action) => {
  switch (action.type) {
    case 'EXTERNAL_UPDATE_STATE':
      return {
        ...action.payload
      };
    case 'DELETE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notification]
      };
    case 'DELETE_TIMEZONE':
      return {
        ...state,
        timezones: state.timezones.filter(
          timezone => timezone.id !== action.payload
        )
      };
    case 'ADD_TIMEZONE':
      return {
        ...state,
        timezones: [action.payload, ...state.timezone]
      };
    default:
      return state;
  }
};
