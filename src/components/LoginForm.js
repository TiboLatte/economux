import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";


export default function Register() {
    const cookies = new Cookies();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("User created" + user);
    var body = {
      email: user.email,
      password: user.password,
    };

    // axios({
    //   method: "post",
    //   url: "http://localhost:5000/api/user/login",
    //   data: body,
    // })
    //   .then(function (response) {
    //     console.log(response.headers.get("auth-token"))
    //   })
    //   .catch(function (error) {
    //     alert(error);
    //   });

    axios
      .post("http://localhost:5000/api/user/login", body)
      .then((response) => {
        cookies.set("auth-token",response.data, {maxAge: 7200})
        console.log(cookies.get("auth-token"))
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="text" name="email" onChange={handleChange}></input>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={handleChange}></input>
      <button>Login</button>
    </form>
  );
}
