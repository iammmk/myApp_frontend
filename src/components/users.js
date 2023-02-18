import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

function AllUsers() {
  const history = useNavigate();
  const [users, setUsers] = useState([]);
  const { ownerId, setOwnerId } = useContext(Context);

  const getUserProfile = (e, uId) => {
    e.preventDefault();
    history(`/userDetails/${uId}`);
  };

  useEffect(() => {
    fetch("http://localhost:3000/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Got all users !") {
          setUsers(data.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Users</h1>
      <div>
        {users.length &&
          users.map((user) => (
            <div key={user._id} style={{ padding: "20px" }}>
              <a
                href="/#"
                onClick={(e) => getUserProfile(e, user._id)}
                style={{ textDecoration: "none" }}
              >
                {user.name} ({user.username}){" "}
                {user._id === localStorage.getItem("profileId") ? "-You" : ""}
              </a>
            </div>
          ))}
      </div>
      <div style={{ padding: "20px" }}>
        <button
          onClick={(e) => getUserProfile(e, localStorage.getItem("profileId"))}
          className="btn btn-primary"
        >
          View My Profile
        </button>
      </div>
    </div>
  );
}

export default AllUsers;
