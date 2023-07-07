import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import ShowStatus from "./layout/components/ShowStatus";
import ShowComments from "./layout/components/ShowComments";
import { ArrowBack } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Navbar from "./Navbar";
import Headers from "./layout/components/Headers";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import AddEmoji from "./Utils/AddEmoji";
import { BASE_URL, BASE_URL_FRONTEND } from "../Services/helper";

const Status = () => {
  const history = useNavigate();
  const { statusId } = useParams();
  const [status, setStatus] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const getStatus = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/status/${statusId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Status Fetched" && data.data) {
          setStatus(data.data);
          setIsLoading(false);
        } else {
          window.location.href = `${BASE_URL_FRONTEND}/home`;
        }
      })
      .catch((error) => console.error(error));
  };

  const getComments = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/status/${statusId}/comment`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Fetched comments") {
          setComments(data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const uploadComment = () => {
    // e.preventDefault();
    setIsLoading(true);
    fetch(`${BASE_URL}/status/${statusId}/comment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        comment: newComment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Added new comment") {
          // alert("Status added !");
          updatePage();
          setNewComment("");
          setIsLoading(false);
        }
      });
  };

  const updatePage = () => {
    setIsLoading(true);
    getStatus();
    getComments();
    setIsLoading(false);
  };

  useEffect(() => {
    sessionStorage.setItem("selectedItem", "");
    getStatus();
    getComments();
  }, []);

  return (
    <>
      <Navbar setIsLoading={setIsLoading} />
      <div
        style={{
          width: "55%",
          margin: "0 auto",
        }}
      >
        <Headers title="Status" />
      </div>
      <div
        style={{
          width: "55%",
          margin: "0 auto",
          paddingTop: "50px",
        }}
      >
        <div style={{ paddingLeft: "8px" }}>
          <ShowStatus
            item={status}
            setIsLoading={setIsLoading}
            getAllStatus={updatePage}
          />
        </div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "45ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="comment"
            label="Post Your Reply.."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
            multiline
            minRows={3}
            maxRows={4}
          />
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <Tooltip title="Add a photo" placement="top-start">
              <IconButton
                style={{ cursor: "pointer" }}
                onClick={() => setPhotoAdd(!photoAdd)}
              >
                <AddAPhotoIcon />
              </IconButton>
            </Tooltip> */}
            {/* {photoAdd && (
              <input
                type="file"
                accept="image/*"
                id="formupload"
                name="image"
                className="form-control"
                onChange={handleStatusPic}
                style={{ width: "300px", marginLeft: "10px" }}
              />
            )} */}
            <AddEmoji newContent={newComment} setNewContent={setNewComment} />
          </div>
        </div>
        <div style={{ paddingBottom: "15px" }}>
          <Button variant="contained" onClick={uploadComment}>
            Post
          </Button>
        </div>
        <Divider variant="middle" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "15px",
            paddingTop: "5px",
          }}
        >
          <Typography variant="h5">Replies</Typography>
          <IconButton style={{ cursor: "default" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
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
        <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
          {comments.length ? (
            comments
              .sort((a, b) => b.uploadTime - a.uploadTime) //status in desc oreder of upload time
              .map((item) => (
                <ShowComments
                  item={item}
                  setIsLoading={setIsLoading}
                  getAllStatus={updatePage}
                  clickAble={true}
                />
              ))
          ) : (
            <Typography>No replies to show.</Typography>
          )}
        </div>
      </div>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default Status;
