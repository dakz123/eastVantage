import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Register() {
  const nameRef = useRef();
  const roleRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confrimPasswordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      role: roleRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confrim_password: confrimPasswordRef.current.value,
    };
    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <h1 className="title">Register for free</h1>
        <form onSubmit={onSubmit}>
          <input ref={nameRef} type="text" placeholder="Name" />
          <input ref={roleRef} type="text" placeholder="Role" />
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input
            ref={confrimPasswordRef}
            type="password"
            placeholder="Confirm Password"
          />
          <button className="btn btn-block">Register</button>
          <p className="message">
            Already Registered?<Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
