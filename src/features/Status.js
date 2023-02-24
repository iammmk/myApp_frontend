import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, TextField,Divider } from "@mui/material";
import ShowStatus from "./layout/components/ShowStatus";
import ShowComments from "./layout/components/ShowComments";
import Navbar from "./SideNav";

const Status = () => {
  const { statusId } = useParams();
  const [status, setStatus] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment]= useState("")
  const [isLoading, setIsLoading] = useState(false);

  const getStatus = () => {
    // setIsLoading(true);
    fetch(`http://localhost:3000/status/${statusId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Status Fetched" && data.data) {
          setStatus(data.data);
        } else {
          window.location.href = "/home";
        }
      })
      .catch((error) => console.error(error));
  };

  const getComments = () => {
    // setIsLoading(true);
    fetch(`http://localhost:3000/status/${statusId}/comment`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Fetched comments") {
          setComments(data.data);
          //   setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const uploadComment=()=>{
    // e.preventDefault();
    // props.setIsLoading(true);
    fetch(`http://localhost:3000/status/${statusId}/comment`, {
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
        }
      });
    setIsLoading(false);
  }

  const updatePage = () => {
    getStatus();
    getComments();
  };

  useEffect(() => {
    getStatus();
    getComments();
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          width: "55%",
          margin: "0 auto",
        }}
      >
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
          Comment
        </Button>
      </div>
      <Divider variant="middle" />
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
            <Typography>No Comments to show.</Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default Status;
