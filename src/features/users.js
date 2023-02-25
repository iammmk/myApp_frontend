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
import Navbar from "./SideNav";
import Headers from "./layout/components/Headers";
import { BASE_URL } from "./helper";

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
    fetch(`${BASE_URL}/user`, {
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
      <Navbar />
      <div
        style={{
          width: "55%",
          margin: "0 auto",
        }}
      >
        <Headers title="People you may follow"/>
      </div>
      <div
        style={{
          width: "55%",
          margin: "0px auto",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "50px"
        }}
      >
        {/* <Typography
          variant="h4"
          // style={{
          //   marginTop: "80px",
          // }}
        >
          People You May Follow
        </Typography> */}
        {/* <Divider variant="middle" /> */}
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {users.length ? (
            users.map((user) => (
              <Card
                sx={{
                  position: "relative",
                  width: "40%",
                  height: "5cm",
                  marginBottom: "20px",
                  background: "rgb(144 137 137)",
                  // backgroundColor: "rgb(166 142 142)",
                  color: "white",
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
                      color="white"
                      gutterBottom
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      sx={{ mb: 2.8, opacity: "0.8" }}
                      color="white"
                    >
                      ({user.username})
                    </Typography>
                    <Typography
                      color="white"
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
            ))
          ) : (
            <Typography variant="h6">No Users</Typography>
          )}
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
