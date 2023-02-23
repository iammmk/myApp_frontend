import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { Backdrop, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { Context } from "../Context";
import FollowButton from "./layout/components/FollowButton";

const Users = () => {
  const history = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ownerId, setOwnerId } = useContext(Context);

  const getUserProfile = (e, uId) => {
    e.preventDefault();
    history(`/userDetails/${uId}`);
  };

  // suggestion for users( whom user is not following)
  const getAllUsers = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Suggestion list fetched") {
          setUsers(data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Nav />
      <div
        style={{
          width: "55%",
          margin: "57px auto",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <Typography
          variant="h4"
          style={{
            marginTop: "80px",
          }}
        >
          People You May Follow
        </Typography>
        <Divider variant="middle" />
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {users.length ?
            users.map((user) => (
              <Card
                sx={{
                  position: "relative",
                  width: "40%",
                  height: "5cm",
                  marginBottom: "20px",
                  background: "#e7d1d1",
                }}
                variant="outlined"
              >
                <CardContent>
                  <a
                    href="/#"
                    onClick={(e) => getUserProfile(e, user._id)}
                    style={{ textAlign: "start", textDecoration: "none" }}
                  >
                    <Typography
                      sx={{ fontSize: 20 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      sx={{ mb: 2.8, opacity: "0.8" }}
                      color="text.secondary"
                    >
                      ({user.username})
                    </Typography>
                    <Typography
                      color="text.secondary"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        opacity: "0.7",
                        fontSize: "15px",
                      }}
                    >
                      {user.bio}
                    </Typography>
                  </a>
                </CardContent>

                <Divider
                  sx={{
                    position: "absolute",
                    bottom: "55px",
                    left: "0",
                    right: "0",
                  }}
                  variant="middle"
                />

                {/* follow btn */}
                <CardActions
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <FollowButton userData={user} updatePage={getAllUsers} />
                </CardActions>
              </Card>
            )) :
            <Typography variant="h6">No Users</Typography>
            }
        </div>
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
  );
};

export default Users;
