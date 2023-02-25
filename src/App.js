import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "../src/features/login_component";
// import SignUp from "../src/features/signup_component";
import UserDetails from "../src/features/userDetails";
import Users from "../src/features/users";
import Status from "../src/features/Status";
import Comment from "../src/features/Comment";
import Home from "../src/features/home";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn === "true" ? <Home /> : <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          {/* <Route path="/sign-up" element={<SignUp />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/userDetails/:uId" element={<UserDetails />} />
          <Route path="/status/:statusId" element={<Status />} />
          <Route path="/comment/:commentId" element={<Comment />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
