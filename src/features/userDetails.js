import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Context } from "../Context";
import Nav from "./Nav";
import Status from "./Status";

const UserProfile = (props) => {
  const { ownerId, setOwnerId } = useContext(Context);
  const [followingList, setFollowingList] = useState([]);

  const getFollowingList = () => {
    fetch(
      `http://localhost:3000/user/${localStorage.getItem(
        "profileId"
      )}/followings`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFollowingList(data.data);
      });
  };

  const followUser = (e, userId) => {
    e.preventDefault();

    fetch(`http://localhost:3000/follow/${userId}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "You started following the user") {
          // alert("follow done");
          getFollowingList();
          props.updatePage();
        }
      });
  };

  const unfollowUser = (e, userId) => {
    e.preventDefault();

    fetch(`http://localhost:3000/follow/${userId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "You've unfollowed the user") {
          // alert("Unfollow done");
          getFollowingList();
          props.updatePage();
        }
      });
  };

  useEffect(() => {
    getFollowingList();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "15px",
        }}
      >
        <div>
          <Typography variant="h4">{props.userData.name}</Typography>
          <Typography style={{ opacity: "70%", textAlign: "start" }}>
            ({props.userData.username})
          </Typography>
        </div>
        <div>
          {props.userData._id !== localStorage.getItem("profileId") &&
            (followingList.some((o) => o._id === props.userData._id) ? (
              <Button
                variant="contained"
                style={{ float: "right", height: "35px", width: "92px" }}
                onClick={(e) => unfollowUser(e, props.userData._id)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{ float: "right", height: "35px", width: "92px" }}
                onClick={(e) => followUser(e, props.userData._id)}
              >
                Follow
              </Button>
            ))}
        </div>
      </div>
      <Typography
        style={{
          paddingTop: "25px",
          paddingBottom: "15px",
          wordWrap: "break-word",
          textAlign: "start",
        }}
      >
        {props.userData.bio}
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          opacity: "0.75",
          paddingBottom: "15px",
        }}
      >
        {props.userData.dob && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <CakeIcon />
            <Typography>Born {props.userData.dob}</Typography>
          </div>
        )}
        {props.userData.joinedOn && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <CalendarMonthIcon />
            <Typography>
              Joined&nbsp;
              {/* {new Date(props.userData.joinedOn).toLocalString()} */}
            </Typography>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "10px",
        }}
      >
        <div>
          <Typography variant="h7">Status:</Typography>{" "}
          <Typography variant="h4">{props.userData.totalStatus}</Typography>
        </div>
        <div>
          <Typography variant="h7">Followers:</Typography>{" "}
          <Typography variant="h4">{props.userData.followersCount}</Typography>
        </div>
        <div>
          <Typography variant="h7">Following:</Typography>{" "}
          <Typography variant="h4">{props.userData.followingCount}</Typography>
        </div>
      </div>
      <Divider variant="middle" />
      <div>
        {props.userStatus.length ? (
          props.userStatus
            .sort((a, b) => b.uploadTime - a.uploadTime) //status in desc oreder of uploadTime
            .map((item) => (
              <Status
                item={item}
                setIsLoading={props.setIsLoading}
                // getAllStatus={props.getStatusByUser(item.userId) props.getUserDetails}
                getAllStatus={props.updatePage}
              />
            ))
        ) : (
          <>
            <Typography>No status</Typography>
          </>
        )}
      </div>
    </div>
  );
};

const UserDetails = () => {
  const [userData, setUserData] = useState("");
  const [status, setStatus] = useState([]);
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

  const getStatusByUser = (uId) => {
    setIsLoading(true);
    fetch(`http://localhost:3000/status/${uId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Fetched status of the user") {
          setStatus(data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const updatePage = () => {
    getUserDetails();
    getStatusByUser(uId);
  };

  useEffect(() => {
    getUserDetails();
    getStatusByUser(uId);
  }, []);

  return (
    <>
      <Nav />
      <div
        style={{
          width: "55%",
          margin: "57px auto",
          paddingLeft: "10px",
          paddingRight: "10px",
          backgroundColor: "#faf2f2",
        }}
      >
        <UserProfile
          userData={userData}
          userStatus={status}
          setIsLoading={setIsLoading}
          updatePage={updatePage}
        />
      </div>
      {/* {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )} */}
    </>
  );
};

export default UserDetails;
