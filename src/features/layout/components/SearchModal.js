import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Typography, Button, TextField, Grid } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Divider from "@mui/material/Divider";
import { Backdrop, CircularProgress } from "@mui/material";
import { BASE_URL, BASE_URL_FRONTEND } from "../../../Services/helper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
  borderRadius: 5,
};

const SearchModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  const getUserProfile = (uId) => {
    window.location.href = `${BASE_URL_FRONTEND}/userDetails/${uId}`;
  };

  // suggestion from search
  const handleSearch = () => {
    // e.preventDefault();
    setIsLoading(true);

    // const searchText = e.target.search.value;
    fetch(`${BASE_URL}/user?search=${searchText}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Got all suggestions !") {
          setUsers(data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Modal
        open={props.modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
        <Grid sx={style}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={10}>
              <TextField
                label="Search User"
                variant="outlined"
                placeholder="Type user name to search..."
                value={searchText}
                fullWidth
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Grid>
            <Grid item xs={2} justifyContent="flex-end">
              <Button variant="contained" size="small" onClick={handleSearch}>
                Search
              </Button>
            </Grid>
          </Grid>
          <div style={{ maxHeight: "calc(100% - 60px)", overflowY: "auto" }}>
            {users.length ? (
              users.map((user) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "80px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "45px",
                        flex: "1",
                      }}
                    >
                      <div className="smallCircle">
                        <img
                          src={user.pImage}
                          alt="dp"
                          onClick={(e) => {
                            e.preventDefault();
                            getUserProfile(user._id);
                          }}
                        />
                      </div>
                      <Typography
                        onClick={(e) => {
                          e.preventDefault();
                          getUserProfile(user._id);
                        }}
                        style={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "blue",
                          flex: "1",
                        }}
                      >
                        {user.name}({user.username})
                      </Typography>
                    </div>
                  </div>
                  <Divider variant="middle" />
                </>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PersonSearchIcon style={{ width: "50%", height: "50%" }} />
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "10px",
              paddingRight: "10px",
              position: "absolute",
              right: "0",
              bottom: "0",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                sessionStorage.setItem(
                  "selectedItem",
                  sessionStorage.getItem("prevItem")
                );
                sessionStorage.setItem("prevItem", "");
                props.setModalOpen(false);
                document.querySelector('input[name="search"]').value = "";
                setUsers([]);
              }}
            >
              Close
            </Button>
          </div>
        </Grid>
      </Modal>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default SearchModal;
