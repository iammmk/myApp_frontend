import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Context } from "../Context";

function AllUsers() {
  const history = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ownerId, setOwnerId } = useContext(Context);

  const getUserProfile = (e, uId) => {
    e.preventDefault();
    history(`/userDetails/${uId}`);
  };

  const getAllUsers = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Got all users !") {
          setUsers(data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Nav />
      <div>
        <Typography
          variant="h4"
          style={{
            marginTop: "80px",
          }}
        >
          Users
        </Typography>
        <div>
          {users.length &&
            users.map((user) => (
              <div key={user._id} style={{ padding: "20px" }}>
                <a
                  href="/#"
                  onClick={(e) => getUserProfile(e, user._id)}
                  style={{ textDecoration: "none" }}
                >
                  {user.name} ({user.username}){" "}
                  {user._id === localStorage.getItem("profileId") ? "-You" : ""}
                </a>
              </div>
            ))}
        </div>
        <div style={{ padding: "20px" }}>
          <button
            onClick={(e) =>
              getUserProfile(e, localStorage.getItem("profileId"))
            }
            className="btn btn-primary"
          >
            View My Profile
          </button>
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
}

export default AllUsers;
