import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { Backdrop, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { Context } from "../Context";
import FollowButton from "./layout/components/FollowButton";
import Navbar from "./SideNav";
import Headers from "./layout/components/Headers";
import { BASE_URL } from "../Services/helper";

const Users = () => {
  const history = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ownerId, setOwnerId } = useContext(Context);
  const [searchText, setSearchText] = useState("");

  const getUserProfile = (e, uId) => {
    e.preventDefault();
    history(`/userDetails/${uId}`);
  };

  // suggestion for users( whom user is not following)
  const getAllUsers = () => {
    console.log(searchText);
    setIsLoading(true);
    fetch(`${BASE_URL}/user/suggestions?search=${searchText}`, {
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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target.search.value);
  };

  useEffect(() => {
    sessionStorage.setItem("selectedItem", "suggestions");
    getAllUsers();
  }, [searchText]);

  return (
    <div style={{ width: "100%" }}>
      <Navbar setIsLoading={setIsLoading} />
      <div
        style={{
          width: "55%",
          margin: "0 auto",
        }}
      >
        <Headers title="People you may follow" />
      </div>
      <div
        style={{
          width: "55%",
          paddingTop: "60px",
          margin: "0 auto",
        }}
      >
        <form
          class="form-inline my-2 my-lg-0"
          style={{
            float: "right",
            paddingRight: "10px",
          }}
          onSubmit={handleSearch}
        >
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search user.."
            aria-label="Search"
            name="search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>

      <div
        style={{
          width: "55%",
          margin: "0px auto",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "50px",
        }}
      >
        {searchText && (
          <Typography>
            <SearchIcon />
            Search results for:&nbsp;<b>{searchText}</b>
          </Typography>
        )}
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
                  height: "6.5cm",
                  marginBottom: "20px",
                  border: "1px solid black",
                }}
                variant="outlined"
              >
                <CardContent>
                  <a
                    href="/#"
                    onClick={(e) => getUserProfile(e, user._id)}
                    style={{ textAlign: "start", textDecoration: "none" }}
                  >
                    <div className="smallCircle">
                      <img src={user.pImage} alt="dp" />
                    </div>
                    <Typography
                      sx={{
                        fontSize: 20,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      gutterBottom
                      color="black"
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      sx={{
                        opacity: "0.8",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      color="black"
                    >
                      ({user.username})
                    </Typography>
                    <Typography
                      color="black"
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
                    left: "0",
                    right: "0",
                  }}
                  variant="middle"
                />
                <CardActions
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <FollowButton
                    userData={user}
                    updatePage={getAllUsers}
                    setIsLoading={setIsLoading}
                  />
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography variant="h6">No Users</Typography>
          )}
        </div>
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
};

export default Users;
