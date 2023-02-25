import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
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
import ViewEditModal from "./ViewEditModal";
import { BASE_URL, BASE_URL_FRONTEND } from "../../../Services/helper";

const ShowComments = (props) => {
  const history = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [viewEdit, setViewEdit] = useState(false);
  const [currentComment, setCurrentComment] = useState("");
  const [currentCommentEditId, setCurrentCommentEditId] = useState("");
  const [currentCommentDeleteId, setCurrentCommentDeleteId] = useState("");
  const [newComment, setNewComment] = useState("");
  const [likedByUsersModalOpen, setLikedByUsersModalOpen] = useState(false);
  const [likeListByCommentId, setLikeListByCommentId] = useState([]);

  const getUserProfile = ( uId) => {
    history(`/userDetails/${uId}`);
  };

  const goToComment = (commentId) => {
    window.location.href = `${BASE_URL_FRONTEND}/comment/${commentId}`;
  };

  function addLike(e, itemId) {
    e.preventDefault();
    props.setIsLoading(true);
    fetch(`${BASE_URL}/like/${itemId}`, {
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
    fetch(`${BASE_URL}/like/${itemId}`, {
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

  const getLikesByCommentId = (commentId) => {
    fetch(`${BASE_URL}/like/status/${commentId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLikeListByCommentId(data.data);
      });
  };

  return (
    <>
      <div
        key={props.item._id}
        style={{ paddingTop: "8px", paddingLeft: "15px" }}
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
            <Typography sx={{ fontSize: "20px" }}>{props.item.uploadedBy}</Typography>
          </a>
          &nbsp;&nbsp;
          <Typography>
            ({new Date(props.item.uploadTime).toLocaleString()})
          </Typography>
          &nbsp; &nbsp;
          {props.item.isEdited ? (
            <a
              href="/#"
              style={{ textDecoration: "none" }}
              onClick={(e) => {
                e.preventDefault(); // page wont redirect to '/#'
                setViewEdit(true);
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>(Edited)</Typography>
            </a>
          ) : (
            <></>
          )}
          <ViewEditModal
            modalOpen={viewEdit}
            setModalOpen={setViewEdit}
            current={props.item.comment}
            prev={props.item.lastEdit}
          />
          {props.item.userId === localStorage.getItem("profileId") ||
          props.item.mainStatusByUserId ===
            localStorage.getItem("profileId") ? (
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
                  {props.item.userId === localStorage.getItem("profileId") && (
                    <>
                      <a
                        className="dropdown-item"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault(); //wont redirect to href
                          setEditModalOpen(true);
                          setCurrentCommentEditId(props.item._id);
                          setCurrentComment(props.item.comment);
                        }}
                      >
                        Edit
                      </a>
                      <div className="dropdown-divider">l</div>
                    </>
                  )}

                  <a
                    className="dropdown-item"
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteModalOpen(true);
                      setCurrentCommentDeleteId(props.item._id);
                    }}
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Typography
          style={{
            wordWrap: "break-word",
            textAlign: "start",
            paddingTop: "15px",
            paddingBottom: "15px",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.preventDefault();
            goToComment(props.item._id);
          }}
        >
          {props.item.comment}
        </Typography>

        {/* likes and comments on comments to be implemented */}

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
              getLikesByCommentId(props.item._id);
            }}
            style={{ textDecoration: "none" }}
          >
            <Typography>{props.item.totalLikes}</Typography>
          </a>
          <ShowUsersModal
            title="Likes"
            showUsersModalOpen={likedByUsersModalOpen}
            setShowUsersModalOpen={setLikedByUsersModalOpen}
            peopleList={likeListByCommentId}
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
          <Tooltip title="View comment" placement="right">
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                goToComment(props.item._id);
              }}
              style={{ textDecoration: "none" }}
            >
              <Typography>{props.item.totalComments}</Typography>
            </a>
          </Tooltip>
          <AddCommentModal
            parentType={"Comment"}
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
        type={"Comment"}
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        currentStatus={currentComment}
        setIsLoading={props.setIsLoading}
        contentId={currentCommentEditId}
        getAllStatus={props.getAllStatus}
      />
      <DeleteModal
        type={"Comment"}
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        message={"Do you want to delete the comment ?"}
        setIsLoading={props.setIsLoading}
        statusId={currentCommentDeleteId}
        getAllStatus={props.getAllStatus}
      />
    </>
  );
};

export default ShowComments;
