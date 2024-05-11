import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { login } from "../../features/slices/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputUsername = (e) => setUsername(e.target.value);
  const handleInputPassword = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => {
    setCheck((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login({ username, password }));
      setUsername("");
      setPassword("");
      navigate("/"); // Redireciona para a página inicial após o login bem-sucedido
    } catch (error) {
      if (!error.originalStatus) {
        setErrMsg(error.response?.data?.detail);
      } else if (error.originalStatus === 400) {
        setErrMsg(error.response?.data?.detail);
      } else if (error.originalStatus === 401) {
        setErrMsg(error.response?.data?.detail);
      } else {
        setErrMsg("Login Failed.");
      }
    }
  };

  return (
    <div>
      <div>
        <h3>Login</h3>
        <div>
          {errMsg && (
            <div>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{errMsg}</Alert>
              </Stack>
            </div>
          )}
        </div>
        <form onSubmit={handleLogin}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputUsername}
            required
          />
          <label>Password:</label>
          <input
            type={check ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleInputPassword}
            required
          />
          <div>
            <label>Show password</label>
            <input
              type="checkbox"
              checked={check}
              onChange={togglePasswordVisibility}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
