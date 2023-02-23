import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { WindowRounded } from "@mui/icons-material";

const Navbar = () => {
  const [open, setOpen] = React.useState(true);

  const signOut = () => {
    fetch("http://localhost:3000/user/logout", {
      method: "GET",
      credentials: "include", // include cookies in the request
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Logout successful") {
          alert("logout successful");
          window.localStorage.clear();
          // history("/sign-in");
          window.location.href = "http://localhost:8080/sign-in";
        }
      });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <List
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "22.4%",
        //   maxWidth: 360,
          bgcolor: "#faf2f2",
          zIndex: 1,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          onClick={() => {
            window.location.href = "http://localhost:8080/home";
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            window.location.href = "http://localhost:8080/users";
          }}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={localStorage.getItem("profileName")} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                window.location.href = `http://localhost:8080/userDetails/${localStorage.getItem(
                  "profileId"
                )}`;
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Go to Profile" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={signOut}>
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
          width: "1px",
          position: "fixed",
          top: 0,
          left: "22.5%",
          bottom: 0,
          borderRight: "1px solid #ccc",
        }}
      ></div>
      <div
        style={{
          width: "1px",
          position: "fixed",
          top: 0,
          right:"22.5%",
          bottom: 0,
          borderLeft: "1px solid #ccc",
        }}
      ></div>
    </>
  );
};

export default Navbar;
