import React, { useState, useEffect } from "react";
import { Backdrop } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Navbar from "./SideNav";
import Headers from "./layout/components/Headers";
import { BASE_URL } from "../Services/helper";
import ShowNotifications from "./layout/components/ShowNotifications";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getNotifications = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/user/notification`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "notifications fetched") {
          setNotifications(data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  // number of unread notifications
  const newNotificationCount = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/user/myProfile`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setNotificationCount(data.data.newNotificationCount);
        setIsLoading(false);
      });
  };

  const markNotificationsAsRead = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/user/notification`, {
      method: "PUT",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "no new notification") {
          setNotificationCount(0);
          setIsLoading(false);
        }
      });
  };

  const clearAllNotifications = () => {
    setIsLoading(true);

    fetch(`${BASE_URL}/user/notification`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "notifications deleted") {
          // alert("status deleted !");
          getNotifications();
          markNotificationsAsRead();
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    getNotifications();
    newNotificationCount();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Navbar setIsLoading={setIsLoading} count={notificationCount} />
      <div
        style={{
          width: "55%",
          margin: "0 auto",
        }}
      >
        <Headers title="Notifications" />
      </div>
      <div
        style={{
          width: "55%",
          margin: "0px auto",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "60px",
        }}
      >
        <div style={{ float: "right" }}>
          <Tooltip title="Mark as read" placement="top-start">
            <IconButton
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                markNotificationsAsRead();
              }}
              disabled={notificationCount === 0}
              style={{ textTransform: "capitalize" }}
            >
              <DoneAllIcon />
            </IconButton>
          </Tooltip>
          &nbsp;
          <Tooltip title="Clear" placement="top-start">
            <IconButton
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                clearAllNotifications();
              }}
              disabled={notifications.length === 0}
              style={{ textTransform: "capitalize" }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div style={{ paddingTop: "40px" }}>
          {notifications.length ? (
            <>
              {notifications
                .sort((a, b) => b.time - a.time)
                .slice(0, notificationCount)
                .map((notification) => (
                  <div key={notification.id}>
                    <ShowNotifications
                      notification={notification}
                      isNew={true}
                    />
                  </div>
                ))}
              {notifications
                .sort((a, b) => b.time - a.time)
                .slice(notificationCount)
                .map((notification) => (
                  <div key={notification.id}>
                    <ShowNotifications notification={notification} />
                  </div>
                ))}{" "}
            </>
          ) : (
            <Typography variant="h6">You have no notifications</Typography>
          )}
        </div>
      </div>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
};

export default Notifications;
