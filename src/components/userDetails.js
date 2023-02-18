import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
          history("/sign-in")
        }
      });
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          Name:
          {props.userData._id !== localStorage.getItem("profileId") ? (
            <button
              className="btn btn-primary"
              style={{ float: "right", padding: "4px" }}
            >
              Follow
            </button>
          ) : (
            <></>
          )}
          <h2>
            {props.userData.name}&nbsp;({props.userData.username})
          </h2>
          Email: <h2>{props.userData.email}</h2>
          Status: <h2>{props.userData.totalStatus}</h2>
          Followers: <h2>{props.userData.followersCount}</h2>
          Following: <h2>{props.userData.followingCount}</h2>
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
