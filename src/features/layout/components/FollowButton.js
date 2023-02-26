import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "../../Style/Style.css";
import { BASE_URL } from "../../../Services/helper";

// to decide follow/unfollow btn depending upon the user
const FollowButton = (props) => {
  const profileId = localStorage.getItem("profileId");
  const [followingListByProfile, setFollowingListByProfile] = useState([]);

  const getFollowingListByProfile = () => {
    fetch(`${BASE_URL}/user/${profileId}/followings`, {
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
    props.setIsLoading(true)
    fetch(`${BASE_URL}/follow/${userId}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "You started following the user") {
          // alert("follow done");
          getFollowingListByProfile(profileId); //to update follow <=> unfollow btn
          props.updatePage(); //to update follow count
          props.setIsLoading(false)
        }
      });
  };

  const unfollowUser = (e, userId) => {
    e.preventDefault();
    props.setIsLoading(true)
    fetch(`${BASE_URL}/follow/${userId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "You've unfollowed the user") {
          // alert("Unfollow done");
          getFollowingListByProfile(profileId); //to update follow <=> unfollow btn
          props.updatePage(); //to update follow count
          props.setIsLoading(false)
        }
      });
  };

  useEffect(() => {
    // getFollowingListByProfile(profileId);
    getFollowingListByProfile(profileId);
  }, []);

  return props.userData._id === profileId ? (
    <></>
  ) : followingListByProfile.some((o) => o._id === props.userData._id) ? (
    <Button
      className="followBtn"
      variant="outlined"
      sx={{ float: "right", height: "35px", width: "92px" }}
      onClick={(e) => unfollowUser(e, props.userData._id)}
    >
      {/* content inside Style.css */}
    </Button>
  ) : (
    <Button
      variant="contained"
      sx={{ float: "right", height: "35px", width: "92px" }}
      onClick={(e) => followUser(e, props.userData._id)}
    >
      Follow
    </Button>
  );
};
export default FollowButton;
