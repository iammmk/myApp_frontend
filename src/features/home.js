import { Button, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import ShowStatus from "./layout/components/ShowStatus";
// import { Context } from "../Context";
import Navbar from "./SideNav";
import { BASE_URL } from "../Services/helper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Headers from "./layout/components/Headers";
import AddPhoto from "./Utils/AddPhoto";
import AddEmoji from "./Utils/AddEmoji";

function Home() {
  const history = useNavigate();
  const [status, setStatus] = useState([]);
  // const { ownerId, setOwnerId } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statusPic, setStatusPic] = useState(null);
  const [photoAdd, setPhotoAdd] = useState(false);

  // status by following + own status
  const getAllStatus = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/status`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Fetched all status") {
          setStatus(data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const uploadStatus = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`${BASE_URL}/status`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
        statusImage: statusPic,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Added new status !!") {
          // alert("Status added !");
          getAllStatus();
          setNewStatus("");
          setPhotoAdd(false);
          document.getElementById("formupload").value = "";
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    getAllStatus();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {/* <Nav /> */}
      <Navbar setIsLoading={setIsLoading} getAllStatus={getAllStatus} />
      <div
        style={{
          width: "55%",
          margin: "0 auto",
        }}
      >
        <Headers title="Home" isHome={true} />
      </div>
      <div
        style={{
          width: "55%",
          margin: "0px auto",
          paddingTop: "60px",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "60ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="status"
            label="What's up ?"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            variant="outlined"
            multiline
            rows={3}
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
            {/* Photo add option */}
            <AddPhoto
              photoAdd={photoAdd}
              setPhotoAdd={setPhotoAdd}
              setStatusPic={setStatusPic}
            />
            {/* Emoji add option */}
            <AddEmoji newContent={newStatus} setNewContent={setNewStatus} />
          </div>
        </div>
        <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
          <Button
            variant="contained"
            onClick={uploadStatus}
            disabled={!newStatus}
          >
            Post
          </Button>
        </div>
        <Divider variant="middle" />
        <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
          {status.length ? (
            status
              .sort((a, b) => b.uploadTime - a.uploadTime) //status in desc oreder of uploadTime
              .map((item) => (
                <ShowStatus
                  item={item}
                  setIsLoading={setIsLoading}
                  getAllStatus={getAllStatus}
                  clickAble={true}
                />
              ))
          ) : (
            <div style={{ paddingTop: "15px" }}>
              <Typography variant="h5">No status to show...</Typography>
              <Typography variant="h5">
                Follow{" "}
                <a href="users" style={{ textDecoration: "none" }}>
                  people
                </a>{" "}
                to see what's happening !!
              </Typography>
            </div>
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
    </div>
  );
}

export default Home;
