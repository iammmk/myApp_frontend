import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Context } from "../Context";
import Nav from "./Nav";

const UserProfile = (props) => {
  const history = useNavigate();
  const { ownerId, setOwnerId } = useContext(Context);
  const getAllUsers = () => {
    history("/users");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          <Typography variant="h7">Name:</Typography>&nbsp;
          {props.userData._id !== localStorage.getItem("profileId") ? (
            <button
              className="btn btn-primary"
              style={{ float: "right", padding: "4px" }}
            >
              Follow
            </button>
          ) : (
            <Typography variant="h8">(Me)</Typography>
          )}
          <Typography variant="h4">
            {props.userData.name}&nbsp;({props.userData.username})
          </Typography>
          <Typography variant="h7">Email:</Typography>{" "}
          <Typography variant="h4">{props.userData.email}</Typography>
          <Typography variant="h7">Status:</Typography>{" "}
          <Typography variant="h4">{props.userData.totalStatus}</Typography>
          <Typography variant="h7">Followers:</Typography>{" "}
          <Typography variant="h4">{props.userData.followersCount}</Typography>
          <Typography variant="h7">Following:</Typography>{" "}
          <Typography variant="h4">{props.userData.followingCount}</Typography>
          <br />
          <div>
            <button onClick={getAllUsers} className="btn btn-primary">
              See All Users
            </button>
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};

const UserDetails = () => {
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { uId } = useParams();

  const getUserDetails = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/user/userProfile/${uId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Nav />
      <UserProfile userData={userData} />
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default UserDetails;
