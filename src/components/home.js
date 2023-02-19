import { Button, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import { Context } from "../Context";

// function LikeButton(props) {
//   const [isLiked, setIsLiked] = useState(false);

//   function addLike(e, itemId) {
//     e.preventDefault();

//     props.setIsLoading(true);
//     fetch(`http://localhost:3000/like/${itemId}`, {
//       method: "POST",
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.message === "Added new like !!") {
//           // alert("Status Liked !");
//           props.getAllStatus();
//           props.setIsLoading(false);
//         }
//       })
//       .catch((error) => console.error(error));
//     // Update the state variable to indicate that the item is liked
//     setIsLiked(true);
//   }

//   function unLike(e, itemId) {
//     e.preventDefault();

//     props.setIsLoading(true);
//     fetch(`http://localhost:3000/like/${itemId}`, {
//       method: "DELETE",
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.message === "Unliked") {
//           console.log("clicked");
//           // alert("Status unliked !");
//           props.getAllStatus();
//           props.setIsLoading(false);
//         }
//       })
//       .catch((error) => console.error(error));
//     // Update the state variable to indicate that the item is not liked
//     setIsLiked(false);
//   }

//   return (
//     <>
//       {isLiked ? (
//         <IconButton onClick={(e) => unLike(e, props.itemId)}>
//           <FavoriteIcon />
//         </IconButton>
//       ) : (
//         <IconButton onClick={(e) => addLike(e, props.itemId)}>
//           <FavoriteBorderIcon />
//         </IconButton>
//       )}
//     </>
//   );
// }

function Home() {
  const history = useNavigate();
  const [status, setStatus] = useState([]);
  // const { ownerId, setOwnerId } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const addComment = () => {};

  const getUserProfile = (e, uId) => {
    e.preventDefault();
    history(`/userDetails/${uId}`);
  };

  const getAllStatus = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/status", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Got all status !!") {
          setStatus(data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const uploadStatus = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch("http://localhost:3000/status", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Added new status !!") {
          // alert("Status added !");
          getAllStatus();
          setNewStatus("");
        }
      });
    setIsLoading(false);
  };

  const editStatus = () => {};

  const deleteStatus = (e, statusId) => {
    e.preventDefault();
    fetch(`http://localhost:3000/status/${statusId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "status deleted successfully") {
          // alert("status deleted !");
          getAllStatus();
        }
      });
  };

  function addLike(e, itemId) {
    e.preventDefault();
    setIsLoading(true);
    console.log(itemId);
    fetch(`http://localhost:3000/like/${itemId}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Added new like !!") {
          // alert("Status Liked !");
          getAllStatus();
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
    // Update the state variable to indicate that the item is liked
  }

  function unLike(e, itemId) {
    e.preventDefault();

    setIsLoading(true);
    fetch(`http://localhost:3000/like/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Unliked") {
          console.log("clicked");
          // alert("Status unliked !");
          getAllStatus();
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
    // Update the state variable to indicate that the item is not liked
  }

  useEffect(() => {
    getAllStatus();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        width: "60%",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h4"
        style={{
          padding: "15px",
        }}
      >
        All Status
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "45ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="status"
          label="What's Happening ?"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          variant="outlined"
          multiline
          minRows={3}
          maxRows={4}
        />
      </Box>
      <Button variant="contained" onClick={uploadStatus}>
        Post
      </Button>
      <div style={{ padding: "15px" }}>
        {status.length ? (
          status
            .sort((a, b) => b.uploadTime - a.uploadTime) //status in desc oreder of uploadTime
            .map((item) => (
              <>
                <div
                  key={item._id}
                  style={{ padding: "20px", background: "#e7e7c7" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <a
                      href="/#"
                      onClick={(e) => getUserProfile(e, item.userId)}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography>{item.uploadedBy}</Typography>
                    </a>
                    &nbsp;&nbsp;
                    <Typography>
                      ({new Date(item.uploadTime).toLocaleString()})
                    </Typography>
                    {item.userId === localStorage.getItem("profileId") ? (
                      <div style={{ marginLeft: "auto" }}>
                        <IconButton onClick={(e) => editStatus(e, item._id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={(e) => deleteStatus(e, item._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography>{"--->"}</Typography>
                    <Typography>{item.status}</Typography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.likedBy.includes(
                      localStorage.getItem("profileId")
                    ) ? (
                      <IconButton onClick={(e) => unLike(e, item._id)}>
                        <FavoriteIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={(e) => addLike(e, item._id)}>
                        <FavoriteBorderIcon />
                      </IconButton>
                    )}
                    &nbsp;
                    <Typography>{item.totalLikes}</Typography>&nbsp;&nbsp;
                    <IconButton onClick={addComment}>
                      <CommentIcon />
                    </IconButton>
                    &nbsp;
                    <Typography>{item.totalComments}</Typography>
                  </div>
                </div>
                <div
                  style={{ border: "none", borderBottom: "1px solid black" }}
                ></div>
              </>
            ))
        ) : (
          <>
            <Typography>No status</Typography>
          </>
        )}
      </div>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default Home;
