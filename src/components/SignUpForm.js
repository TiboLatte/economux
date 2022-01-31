import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("User created" + user.email);
    console.log(user.name, user.email, user.password);
    var body = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    axios({
      method: "post",
      url: "http://localhost:5000/api/user/register",
      data: body,
    })
      .then(function (response) {
        alert(response);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" onChange={handleChange}></input>
      <label htmlFor="email">Email</label>
      <input type="text" name="email" onChange={handleChange}></input>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={handleChange}></input>
      <button>Register</button>
    </form>
  );
}