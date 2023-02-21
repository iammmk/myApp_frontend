import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const history = useNavigate();

  const logOut = () => {
    fetch("http://localhost:3000/user/logout", {
      method: "GET",
      credentials: "include", // include cookies in the request
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Logout successful") {
          alert("logout successful");
          window.localStorage.clear();
          // history("/sign-in");
          window.location.href = "http://localhost:8080/sign-in";
        }
      });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a className="navbar-brand" href="/">
        myApp
      </a>
      {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="/#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button> */}

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/home">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/users">
              Users
            </a>
          </li>
          <li className="nav-item dropdown ">
            <a
              className="nav-link dropdown-toggle"
              href="/#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {localStorage.getItem("profileName")}
              {/* <MoreHorizIcon/> */}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a
                className="dropdown-item"
                href={`/userDetails/${localStorage.getItem("profileId")}`}
              >
                Go to Profile
              </a>
              <div className="dropdown-divider">l</div>
              <a
                className="dropdown-item"
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  logOut();
                }}
              >
                Sign Out
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
