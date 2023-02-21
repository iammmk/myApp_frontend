import { Button, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Nav from "./Nav";
import Status from "./Status";
// import { Context } from "../Context";

function Home() {
  const history = useNavigate();
  const [status, setStatus] = useState([]);
  // const { ownerId, setOwnerId } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [newStatus, setNewStatus] = useState("");

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

  useEffect(() => {
    getAllStatus();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Nav />
      <div
        style={{
          width: "55%",
          margin: "0 auto",
          backgroundColor: "#faf2f2",
        }}
      >
        <Typography
          variant="h4"
          style={{
            marginTop: "55px",
            paddingTop: "15px",
          }}
        >
          Status
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
        <div style={{ paddingBottom: "15px" }}>
          <Button variant="contained" onClick={uploadStatus}>
            Post
          </Button>
        </div>
        <Divider variant="middle" />
        <div style={{ paddingTop: "15px" }}>
          {status.length ? (
            status
              .sort((a, b) => b.uploadTime - a.uploadTime) //status in desc oreder of uploadTime
              .map((item) => (
                <Status
                  item={item}
                  setIsLoading={setIsLoading}
                  getAllStatus={getAllStatus}
                />
              ))
          ) : (
            <>
              <Typography>No status</Typography>
            </>
          )}
        </div>
        {/* {isLoading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )} */}
      </div>
    </div>
  );
}

export default Home;
