import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const collectData = async() => {
    //you can also use axios for this
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    result = await result.json();
    if(result) {
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h1>SignUp</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter name"
      />
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      <button onClick={collectData} className="appButton" type="button">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
