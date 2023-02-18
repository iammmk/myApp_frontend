import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

function Home() {
  const history = useNavigate();
  const [status, setStatus] = useState([]);
  const { ownerId, setOwnerId } = useContext(Context);

  //   const getUserProfile = (e, uId) => {
  //     e.preventDefault();
  //     history(`/userDetails/${uId}`);
  //   };

  useEffect(() => {
    fetch("http://localhost:3000/status", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Got all status !!") {
          setStatus(data.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Status</h1>
      <div>
        {status.length &&
          status.map((item) => (
            <div key={item._id} style={{ padding: "20px" }}>
              {/* <a
                href="/#"
                onClick={(e) => getUserProfile(e, user._id)}
                style={{ textDecoration: "none" }}
              > */}
              {item.status} ({item.uploadTime}){" "}
              {/* {user._id === ownerId ? "-You" : ""} */}
              {/* </a> */}
            </div>
          ))}
      </div>
      {/* <div style={{ padding: "20px" }}>
        <button
          onClick={(e) => getUserProfile(e, ownerId)}
          className="btn btn-primary"
        >
          View My Profile
        </button>
      </div> */}
    </div>
  );
}

export default Home;
