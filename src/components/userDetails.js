import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Context } from "../Context";

const UserProfile = (props) => {
  const history = useNavigate();
  const { ownerId, setOwnerId } = useContext(Context);
  const getAllUsers = () => {
    history("/users");
  };
  const logOut = () => {
    fetch("http://localhost:3000/user/logout", {
      method: "GET",
      credentials: "include", // include cookies in the request
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Logout successful") {
          alert("logout successful");
          window.localStorage.clear();
          history("/sign-in");
        }
      });
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
            {props.userData._id === localStorage.getItem("profileId") ? (
              <button onClick={logOut} className="btn btn-primary">
                Log Out
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserDetails = () => {
  const [userData, setUserData] = useState("");
  let { uId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/user/userProfile/${uId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
      });
  }, []);

  return <UserProfile userData={userData} />;
};

export default UserDetails;
