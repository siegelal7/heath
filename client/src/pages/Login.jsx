import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/login", userInfo)
      .then((response) => {
        console.log(response);
        // console.log(response);
        if (response.status === 200) {
          console.log("this");
          navigate("/", {state: { loginResponse: response.data}});
          // console.log(response.status);
        } else {
          console.log("that");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    // console.log(e.target);
    const obj = { ...userInfo };
    obj[e.target.name] = e.target.value;
    setUserInfo(obj);
    // if(e.target.name==='email'){
    //   const obj = {...userInfo};
    //   obj.email = e.target.value;
    //   setUserInfo(obj);
    // } else if (e.target.name === 'password'){
    //   const obj = {...userInfo};
    //   obj.password = e.target.value;
    //   setUserInfo(obj);
    // }
  };
  return (
    <form onSubmit={handleLoginSubmit}>
      <label>
        Email:{" "}
        <input
          type="email"
          onChange={handleInputChange}
          name="email"
          value={userInfo.email}
        ></input>
      </label>
      <label>
        Password:{" "}
        <input
          type="password"
          onChange={handleInputChange}
          name="password"
          value={userInfo.password}
        ></input>
      </label>
      <button onClick={handleLoginSubmit}>Login</button>
    </form>
  );
}
