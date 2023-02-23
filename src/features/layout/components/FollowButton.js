import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

// to decide follow/unfollow btn depending upon the user
const FollowButton = (props) => {
  const profileId = localStorage.getItem("profileId");
  const [followingListByProfile, setFollowingListByProfile] = useState([]);

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
          getFollowingListByProfile(profileId); //to update follow <=> unfollow btn
          props.updatePage(); //to update follow count
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
          getFollowingListByProfile(profileId); //to update follow <=> unfollow btn
          props.updatePage(); //to update follow count
        }
      });
  };

  useEffect(() => {
    // getFollowingListByProfile(profileId);
    getFollowingListByProfile(profileId)
  }, []);

  return props.userData._id === profileId ? (
    <></>
  ) : followingListByProfile.some((o) => o._id === props.userData._id) ? (
    <Button
      variant="outlined"
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
  );
};
export default FollowButton;