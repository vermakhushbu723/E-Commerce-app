import React, { useState } from "react";
import styles from "../css/login.module.css";
import Axios from "axios";
import { LOGIN_URL } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  // state to maintain username entered by user
  const [username, setUserName] = useState("");
  // state to maintain password entered by user
  const [password, setPassword] = useState("");
  // state for error received in case of incorrect username or password
  const [error, setError] = useState(null);

  // reciving props
  let loggedIn = props.loggedIn;
  let handleSetLoggedIn = props.handleSetLoggedIn;

  const navigate = useNavigate();

  // function to handle user login. In case of successfull login we will redirect user to home state after changing login state to true and add token to local storage. In case of failed login, display error message on screen and set error state respectively
  function handleLogin(e) {
    e.preventDefault();
    Axios.post(LOGIN_URL, {
      username,
      password,
    })
      .then((res) => {
        // add token to local storage and make proper use of this token
        // console.log(res.data);
        localStorage.setItem('jwt', 'BEARER ' + res.data.token)
        handleSetLoggedIn(true);
      })
      .catch((err) => {
        handleSetLoggedIn(false);
        setError(err);
        setUserName("");
        setPassword("");
      });
  }

  return (
    <div className={styles.container}>
      {loggedIn ? (
        <>
          <h1>'Log In Successfull! Redirecting...'</h1>
          {navigate("/")}
        </>
      ) : (
        <form onSubmit={handleLogin}>
          <h4 className={styles.errorMessage}>
            {error ? `${error.message} - ${error.response.data}` : null}
          </h4>
          <h1>Log in</h1>

          <input
            required
            type="text"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <input
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className={styles.login}>Log in</button>
        </form>
      )}
    </div>
  );
}
