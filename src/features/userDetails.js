import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Context } from "../Context";
import Nav from "./Nav";
import Status from "./layout/components/Status";
import EditProfileModal from "./layout/components/editProfileModal";
import ShowUsersModal from "./layout/components/showUsersModal";

const UserProfile = (props) => {
  const profileId = localStorage.getItem("profileId");
  const { ownerId, setOwnerId } = useContext(Context);
  const [followingListByProfile, setFollowingListByProfile] = useState([]);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [followingListByUser, setFollowingListByUser] = useState([]);
  const [followersListByUser, setFollowersListByUser] = useState([]);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);
  const [followersModalOpen, setFollowersModalOpen] = useState(false);

  const getFollowingListByProfile = () => {
    fetch(`http://localhost:3000/user/${profileId}/followings`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setFollowingListByProfile(data.data);
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
          getFollowingListByProfile(profileId);
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
          getFollowingListByProfile(profileId);
          props.updatePage();
        }
      });
  };

  const getFollowingListByUserId = (userId) => {
    fetch(`http://localhost:3000/user/${userId}/followings`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setFollowingListByUser(data.data);
      });
  };

  const getFollowersListByUserId = (userId) => {
    fetch(`http://localhost:3000/user/${userId}/followers`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setFollowersListByUser(data.data);
      });
  };

  useEffect(() => {
    getFollowingListByProfile(profileId);
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
          <Typography
            style={{ opacity: "70%", textAlign: "start" }}
            onClick={() => console.log(props.userData._id)}
          >
            ({props.userData.username})
          </Typography>
        </div>
        <div>
          {props.userData._id !== localStorage.getItem("profileId") ? (
            followingListByProfile.some((o) => o._id === props.userData._id) ? (
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
            )
          ) : (
            <Button
              variant="contained"
              style={{ float: "right", height: "35px", width: "133px" }}
              onClick={(e) => {
                e.preventDefault(); //wont redirect to href
                setEditProfileModalOpen(true);
              }}
            >
              Edit profile
            </Button>
          )}
          <EditProfileModal
            editProfileModalOpen={editProfileModalOpen}
            setEditProfileModalOpen={setEditProfileModalOpen}
            setIsLoading={props.setIsLoading}
            getUserDetails={props.getUserDetails}
            name={props.userData.name}
            bio={props.userData.bio}
            dob={props.userData.dob}
          />
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
          paddingBottom: "22px",
        }}
      >
        {props.userData.dob && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <CakeIcon />
            <Typography>
              Born{" "}
              {new Date(props.userData.dob).toLocaleString("default", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </Typography>{" "}
            &ensp;&ensp;&ensp;&ensp;
          </div>
        )}
        {props.userData.joinedOn && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <CalendarMonthIcon />
            <Typography>
              Joined&nbsp;
              {new Date(props.userData.joinedOn).toLocaleString("default", {
                month: "short",
              })}{" "}
              {new Date(props.userData.joinedOn).getFullYear()}
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Status:</Typography>{" "}
          <Typography variant="h6">{props.userData.totalStatus}</Typography>
        </div>
        <a
          href="/#"
          onClick={(e) => {
            e.preventDefault();
            setFollowersModalOpen(true);
            getFollowersListByUserId(props.userData._id);
          }}
          style={{textDecoration: "none"}}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Followers:</Typography>{" "}
            <Typography variant="h6">
              {props.userData.followersCount}
            </Typography>
          </div>
        </a>
        <ShowUsersModal
          title="Followers"
          showUsersModalOpen={followersModalOpen}
          setShowUsersModalOpen={setFollowersModalOpen}
          peopleList={followersListByUser}
          count={props.userData.followersCount}
        />
        <a
          href="/#"
          onClick={(e) => {
            e.preventDefault();
            setFollowingModalOpen(true);
            getFollowingListByUserId(props.userData._id);
          }}
          style={{textDecoration: "none"}}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Following:</Typography>{" "}
            <Typography variant="h6">
              {props.userData.followingCount}
            </Typography>
          </div>
        </a>
        <ShowUsersModal
          title="Following"
          showUsersModalOpen={followingModalOpen}
          setShowUsersModalOpen={setFollowingModalOpen}
          peopleList={followingListByUser}
          count={props.userData.followingCount}
        />
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
        // console.log(data.data)
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
          // backgroundColor: "#faf2f2",
        }}
      >
        <UserProfile
          userData={userData}
          userStatus={status}
          setIsLoading={setIsLoading}
          updatePage={updatePage}
          getUserDetails={getUserDetails}
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
