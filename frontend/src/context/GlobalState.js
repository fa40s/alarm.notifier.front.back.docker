import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const URL = "ws://0.0.0.0:1337";
const ws = new WebSocket(URL);

ws.onopen = () => {
  console.log("connected");
};

ws.onclose = () => {
  console.log("disconnected");
};

// Initial state
let initialState = {
  utc_time: null,
  timezones: [],
  notifications: []
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Heartbeat Action
  ws.onmessage = e => {
    const external_state = JSON.parse(e.data);
    dispatch({
      type: "EXTERNAL_UPDATE_STATE",
      payload: external_state
    });
  };

  function deleteNotification(obj) {
    const request = { action: "delete", type: "notification", object: obj };
    ws.send(JSON.stringify(request));
  }

  function modifyNotification(notification) {
    const request = {
      action: "update",
      type: "notification",
      object: notification
    };
    ws.send(JSON.stringify(request));
  }

  function addNotification(notification) {
    const request = {
      action: "create",
      type: "notification",
      object: notification
    };
    ws.send(JSON.stringify(request));
  }

  function deleteTimeZone(obj) {
    const request = { action: "delete", type: "timezone", object: obj };
    ws.send(JSON.stringify(request));
  }

  function modifyTimeZone(timezone) {
    const request = { action: "update", type: "timezone", object: timezone };
    ws.send(JSON.stringify(request));
  }

  function addTimeZone(timezone) {
    const request = { action: "create", type: "timezone", object: timezone };
    ws.send(JSON.stringify(request));
  }

  return (
    <GlobalContext.Provider
      value={{
        timezones: state.timezones,
        notifications: state.notifications,
        utc_time: state.utc_time,

        deleteNotification,
        modifyNotification,
        addNotification,

        deleteTimeZone,
        modifyTimeZone,
        addTimeZone
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
