import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import EditStatusModal from "./editStatusModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteModal from "./deleteModal";
import ShowUsersModal from "./showUsersModal";
import AddCommentModal from "./AddCommentModal";

const ShowStatus = (props) => {
  const history = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentStatusEditId, setCurrentStatusEditId] = useState("");
  const [currentStatusDeleteId, setCurrentStatusDeleteId] = useState("");
  const [likedByUsersModalOpen, setLikedByUsersModalOpen] = useState("");
  const [likeListByStatusId, setLikeListByStatusId] = useState([]);

  const getUserProfile = (e, uId) => {
    history(`/userDetails/${uId}`);
  };

  const goToStatus = (e, statusId) => {
    history(`/status/${statusId}`);
  };

  function addLike(e, itemId) {
    e.preventDefault();
    props.setIsLoading(true);
    fetch(`http://localhost:3000/like/${itemId}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Added new like !!") {
          // alert("Status Liked !");
          props.getAllStatus();
          props.setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
    // Update the state variable to indicate that the item is liked
  }

  function unLike(e, itemId) {
    e.preventDefault();

    // setIsLoading(true);
    fetch(`http://localhost:3000/like/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Unliked") {
          // alert("Status unliked !");
          props.getAllStatus();
          // setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
    // Update the state variable to indicate that the item is not liked
  }

  const getLikesByStatusId = (statusId) => {
    fetch(`http://localhost:3000/like/status/${statusId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLikeListByStatusId(data.data);
      });
  };

  return (
    <>
      <div
        key={props.item._id}
        style={{ paddingTop: "8px", paddingLeft: "8px" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              getUserProfile(e, props.item.userId);
            }}
            style={{ textDecoration: "none" }}
          >
            <Typography>{props.item.uploadedBy}</Typography>
          </a>
          &nbsp;&nbsp;
          <Typography>
            ({new Date(props.item.uploadTime).toLocaleString()})
          </Typography>
          {props.item.userId === localStorage.getItem("profileId") && (
            <div style={{ marginLeft: "auto" }}>
              <div className="dropdown">
                <Tooltip title="More" placement="top-start">
                  <IconButton
                    className="secondary"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </Tooltip>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a
                    className="dropdown-item"
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault(); //wont redirect to href
                      setEditModalOpen(true);
                      setCurrentStatusEditId(props.item._id);
                      setCurrentStatus(props.item.status);
                    }}
                  >
                    Edit
                  </a>
                  <div className="dropdown-divider">l</div>
                  <a
                    className="dropdown-item"
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteModalOpen(true);
                      setCurrentStatusDeleteId(props.item._id);
                    }}
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        <Typography
          style={{
            wordWrap: "break-word",
            textAlign: "start",
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          {props.item.status}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          {props.item.likedBy?.includes(localStorage.getItem("profileId")) ? (
            <IconButton onClick={(e) => unLike(e, props.item._id)}>
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton onClick={(e) => addLike(e, props.item._id)}>
              <FavoriteBorderIcon />
            </IconButton>
          )}
          &nbsp;
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              setLikedByUsersModalOpen(true);
              getLikesByStatusId(props.item._id);
            }}
            style={{ textDecoration: "none" }}
          >
            <Typography>{props.item.totalLikes}</Typography>
          </a>
          <ShowUsersModal
            title="Likes"
            showUsersModalOpen={likedByUsersModalOpen}
            setShowUsersModalOpen={setLikedByUsersModalOpen}
            peopleList={likeListByStatusId}
            count={props.item.totalLikes}
            message={"No Likes"}
          />
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              setCommentModalOpen(true);
            }}
          >
            <CommentIcon />
          </IconButton>
          &nbsp;
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              goToStatus(e, props.item._id);
            }}
            style={{ textDecoration: "none" }}
          >
            <Typography>{props.item.totalComments}</Typography>
          </a>
          <AddCommentModal
            parentType={"Status"}
            modalOpen={commentModalOpen}
            setModalOpen={setCommentModalOpen}
            status={props.item}
            getAllStatus={props.getAllStatus}
            setIsLoading={props.setIsLoading}
          />
        </div>
      </div>
      <Divider variant="middle" />
      <EditStatusModal
        type="Status"
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        currentStatus={currentStatus}
        setIsLoading={props.setIsLoading}
        contentId={currentStatusEditId}
        getAllStatus={props.getAllStatus}
      />
      <DeleteModal
        type="Status"
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        message={"Do you want to delete the status ?"}
        setIsLoading={props.setIsLoading}
        statusId={currentStatusDeleteId}
        getAllStatus={props.getAllStatus}
      />
    </>
  );
};

export default ShowStatus;
