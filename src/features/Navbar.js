import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import AddStatusModal from "./layout/components/AddStatusModal";
import { Backdrop } from "@mui/material";
import "../../src/features/Style/Style.css";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL, BASE_URL_FRONTEND } from "../Services/helper";

const Navbar = (props) => {
  const [open, setOpen] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
  const [image, setImage] = useState("");
  // const [addStatusModalOpen, setAddStatusModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const newNotificationCount = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/user/myProfile`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setNotificationCount(data.data.newNotificationCount);
        setImage(data.data.pImage);
        setIsLoading(false);
      });
  };

  const signOut = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/user/logout`, {
      method: "GET",
      credentials: "include", // include cookies in the request
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Logout successful") {
          // alert("logout successful");
          window.localStorage.clear();
          // history("/sign-in");
          window.location.href = `${BASE_URL_FRONTEND}/sign-in`;
          setIsLoading(false);
        }
      });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  let count = `${props.count === undefined ? notificationCount : props.count}`;
  let dp = `${props.dp === undefined ? image : props.dp}`;

  useEffect(() => {
    newNotificationCount();
  }, []);

  return (
    <>
      <List
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "22.5%",
          zIndex: 1,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          sx={{ height: "60px", pl: "38%" }}
          onClick={() => {
            window.location.href = `${BASE_URL_FRONTEND}/home`;
          }}
        >
          <ListItemText primary={<Typography variant="h5">myApp</Typography>} />
        </ListItemButton>
        <ListItemButton
          className={
            sessionStorage.getItem("selectedItem") === "home" ? "selected" : ""
          }
          sx={{
            height: "50px",
          }}
          onClick={() => {
            sessionStorage.setItem("selectedItem", "home");
            window.location.href = `${BASE_URL_FRONTEND}/home`;
          }}
        >
          <ListItemIcon
            className={
              sessionStorage.getItem("selectedItem") === "home"
                ? "selectedIcon"
                : ""
            }
          >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          className={
            sessionStorage.getItem("selectedItem") === "notifications"
              ? "selected"
              : ""
          }
          sx={{ height: "50px" }}
          onClick={() => {
            sessionStorage.setItem("selectedItem", "notifications");
            window.location.href = `${BASE_URL_FRONTEND}/notifications`;
          }}
        >
          <ListItemIcon
            className={
              sessionStorage.getItem("selectedItem") === "notifications"
                ? "selectedIcon"
                : ""
            }
          >
            <NotificationsNoneIcon />
          </ListItemIcon>
          <ListItemText
            primary={`Notifications${count !== "0" ? ` (${count})` : ""}`}
            style={{
              color:
                count !== "0" &&
                sessionStorage.getItem("selectedItem") !== "notifications"
                  ? "blue"
                  : "inherit",
            }}
          />
        </ListItemButton>
        <ListItemButton
          className={
            sessionStorage.getItem("selectedItem") === "suggestions"
              ? "selected"
              : ""
          }
          sx={{ height: "50px" }}
          onClick={() => {
            sessionStorage.setItem("selectedItem", "suggestions");
            window.location.href = `${BASE_URL_FRONTEND}/users`;
          }}
        >
          <ListItemIcon
            className={
              sessionStorage.getItem("selectedItem") === "suggestions"
                ? "selectedIcon"
                : ""
            }
          >
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Suggestions" />
        </ListItemButton>
        {/* <ListItemButton
          className={
            sessionStorage.getItem("selectedItem") === "add status"
              ? "selected"
              : ""
          }
          sx={{ height: "50px" }}
          onClick={() => {
            sessionStorage.setItem(
              "prevItem",
              sessionStorage.getItem("selectedItem")
            );
            sessionStorage.setItem("selectedItem", "add status");
            setAddStatusModalOpen(true);
          }}
        >
          <ListItemIcon
            className={
              sessionStorage.getItem("selectedItem") === "add status"
                ? "selectedIcon"
                : ""
            }
          >
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Status" />
        </ListItemButton>
        <AddStatusModal
          modalOpen={addStatusModalOpen}
          setModalOpen={setAddStatusModalOpen}
          getAllStatus={props.getAllStatus}
          setIsLoading={props.setIsLoading}
        /> */}
        <ListItemButton
          className={
            sessionStorage.getItem("selectedItem") === "profile"
              ? "selected"
              : ""
          }
          sx={{ height: "50px", pl: "10px" }}
          onClick={() => {
            handleClick();
          }}
        >
          <div className="navCircle">
            <img src={dp} alt="dp" />
          </div>
          &ensp;&ensp;&nbsp;
          {/* show only first name */}
          <ListItemText
            primary={localStorage.getItem("profileName").split(" ")[0]}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, height: "50px" }}
              onClick={() => {
                sessionStorage.setItem("selectedItem", "profile");
                window.location.href = `${BASE_URL_FRONTEND}/userDetails/${localStorage.getItem(
                  "profileId"
                )}`;
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Go to Profile" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, height: "50px" }} onClick={signOut}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <div
        style={{
          // width: "1px",
          position: "fixed",
          top: 0,
          left: "22.5%",
          bottom: 0,
          borderLeft: "1px solid #ccc",
        }}
      ></div>
      <div
        style={{
          // width: "1px",
          position: "fixed",
          top: 0,
          right: "22.5%",
          bottom: 0,
          borderRight: "1px solid #ccc",
        }}
      ></div>
      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default Navbar;
