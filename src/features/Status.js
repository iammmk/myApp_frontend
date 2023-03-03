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
import Navbar from "./SideNav";
import Headers from "./layout/components/Headers";
import { Backdrop} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL, BASE_URL_FRONTEND } from "../Services/helper";

const Status = () => {
  const history = useNavigate();
  const { statusId } = useParams();
  const [status, setStatus] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          setIsLoading(false)
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
          setIsLoading(false)
        }
      });
  };

  const updatePage = () => {
    setIsLoading(true)
    getStatus();
    getComments();
    setIsLoading(false)
  };

  useEffect(() => {
    getStatus();
    getComments();
  }, []);

  return (
    <>
      <Navbar setIsLoading={setIsLoading}  />
      <div
        style={{
          width: "55%",
          margin: "0 auto",
        }}
      >
        <Headers title="Status" />
      </div>
      <div style={{ width: "55%", margin: "0 auto", paddingTop: "50px" }}>
        <ShowStatus
          item={status}
          setIsLoading={setIsLoading}
          getAllStatus={updatePage}
        />
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
          <IconButton>
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
