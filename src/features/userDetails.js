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
import FollowButton from "./layout/components/FollowButton";
import ShowStatus from "./layout/components/ShowStatus";
import EditProfileModal from "./layout/components/editProfileModal";
import ShowUsersModal from "./layout/components/showUsersModal";
import Navbar from "./SideNav";
import Headers from "./layout/components/Headers";
import { BASE_URL } from "../Services/helper";

const UserProfile = (props) => {
  const profileId = localStorage.getItem("profileId");
  const { ownerId, setOwnerId } = useContext(Context);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [followingListByUser, setFollowingListByUser] = useState([]);
  const [followersListByUser, setFollowersListByUser] = useState([]);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [showAllStatus, setShowAllStatus] = useState(true);
  const [showLikedStatus, setShowLikedStatus] = useState(false);

  const getFollowingListByUserId = (userId) => {
    fetch(`${BASE_URL}/user/${userId}/followings`, {
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
    fetch(`${BASE_URL}/user/${userId}/followers`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setFollowersListByUser(data.data);
      });
  };

  useEffect(() => {
    getFollowingListByUserId(profileId);
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
          {/* follow btn or edit profile btn */}
          {props.userData._id !== localStorage.getItem("profileId") ? (
            <FollowButton
              userData={props.userData}
              updatePage={props.updatePage}
            />
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
        {/* following modal */}
        <a
          href="/#"
          onClick={(e) => {
            e.preventDefault();
            setFollowersModalOpen(true);
            getFollowersListByUserId(props.userData._id);
          }}
          style={{ textDecoration: "none" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Followers:</Typography>{" "}
            <Typography variant="h6">
              {props.userData.followersCount}
            </Typography>
          </div>
        </a>

        {/* Followers modal */}
        <ShowUsersModal
          title="Followers"
          showUsersModalOpen={followersModalOpen}
          setShowUsersModalOpen={setFollowersModalOpen}
          peopleList={followersListByUser}
          count={props.userData.followersCount}
          message={"No Followers"}
          updatePage={props.getUserDetails}
        />
        <a
          href="/#"
          onClick={(e) => {
            e.preventDefault();
            setFollowingModalOpen(true);
            getFollowingListByUserId(props.userData._id);
          }}
          style={{ textDecoration: "none" }}
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
          message={"No Following"}
          updatePage={props.getUserDetails}
        />
      </div>

      {/* Status/Liked btn */}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          variant="contained"
          disabled={showAllStatus}
          style={{
            width: "50%",
          }}
          onClick={() => {
            setShowAllStatus(true);
            setShowLikedStatus(false);
          }}
        >
          Status({props.userData.totalStatus})
        </Button>
        <Button
          variant="contained"
          style={{
            width: "50%",
          }}
          disabled={showLikedStatus}
          onClick={() => {
            setShowAllStatus(false);
            setShowLikedStatus(true);
          }}
        >
          Likes ({props.likedStatus.length})
        </Button>
      </div>
      {/* <Divider variant="middle" /> */}
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "black",
          width: "100%",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      />
      {/* show status */}
      <div>
        {showAllStatus && props.userStatus.length ? (
          props.userStatus
            .sort((a, b) => b.uploadTime - a.uploadTime) //status in desc oreder of uploadTime
            .map((item) => (
              <ShowStatus
                item={item}
                setIsLoading={props.setIsLoading}
                // getAllStatus={props.getStatusByUser(item.userId) props.getUserDetails}
                getAllStatus={props.updatePage}
              />
            ))
        ) : showLikedStatus && props.likedStatus.length ? (
          props.likedStatus
            .sort((a, b) => b.uploadTime - a.uploadTime) //status in desc oreder of uploadTime
            .map((item) => (
              <ShowStatus
                item={item}
                setIsLoading={props.setIsLoading}
                // getAllStatus={props.getStatusByUser(item.userId) props.getUserDetails}
                getAllStatus={props.updatePage}
              />
            ))
        ) : (
          <>
            <Typography variant="h5">No status</Typography>
          </>
        )}
      </div>
    </div>
  );
};

const UserDetails = () => {
  const [userData, setUserData] = useState("");
  const [status, setStatus] = useState([]);
  const [statusLikedByUser, setStatusLikedByUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let { uId } = useParams();

  const getUserDetails = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/user/userProfile/${uId}`, {
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

  // status posted by uId
  const getStatusByUser = (uId) => {
    setIsLoading(true);
    fetch(`${BASE_URL}/user/${uId}/status`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Fetched status of the user") {
          // console.log("hello")
          setStatus(data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  // status liked by uId
  const getStatusLikedByUser = (uId) => {
    setIsLoading(true);
    fetch(`${BASE_URL}/user/${uId}/like`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Liked content by user fetched successfully") {
          setStatusLikedByUser(data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const updatePage = () => {
    getUserDetails();
    getStatusByUser(uId);
    getStatusLikedByUser(uId);
  };

  useEffect(() => {
    getUserDetails();
    getStatusByUser(uId);
    getStatusLikedByUser(uId);
  }, []);

  return (
    <>
      {/* <Nav /> */}
      <Navbar getAllStatus={updatePage} />
      <div
        style={{
          width: "55%",
          margin: "0px auto",
        }}
      >
        <Headers
          title={`${userData.name} (${userData.followersCount} followers)`}
        />
      </div>
      <div
        style={{
          width: "55%",
          margin: "0px auto",
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingTop: "50px",
        }}
      >
        <UserProfile
          userData={userData}
          userStatus={status}
          likedStatus={statusLikedByUser}
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
