import React, { useContext } from "react";

import { Notification } from "./Notification";

import { GlobalContext } from "../../context/GlobalState";

export const NotificationsList = () => {
  const { notifications } = useContext(GlobalContext);

  return (
    <>
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </>
  );
};
