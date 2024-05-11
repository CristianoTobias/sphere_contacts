import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [check, setCheck] = useState(false);

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleInputconfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setCheck((prevState) => !prevState);
  };

  useEffect(() => {
    let timer;
    if (successMsg) {
      timer = setTimeout(() => {
        setSuccessMsg("");
        navigate("/login");
      }, 5000); // Mudar o tempo de exibição aqui (em milissegundos)
    }
    return () => clearTimeout(timer);
  }, [successMsg, navigate]);

  const apiUrl = "http://localhost:8000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/useregist/`, {
        username: username,
        password: password,
      });

      if (response.status === 201) {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setSuccessMsg("Successfully registered, please log in!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrMsg("Username already exists!");
      } else {
        setErrMsg("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <div>
        <h3>Register</h3>
        <div>
          {errMsg && (
            <div>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{errMsg}</Alert>
              </Stack>
            </div>
          )}

          {successMsg && (
            <div>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">{successMsg}</Alert>
              </Stack>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={handleInputUsername}
            value={username}
            required
          />
          <label>Password:</label>
          <input
            type={check ? "text" : "password"}
            name="password"
            onChange={handleInputPassword}
            value={password}
            required
          />
          <label>Confirm Password:</label>
          <input
            type={check ? "text" : "password"}
            name="confirm-password"
            onChange={handleInputconfirmPassword}
            value={confirmPassword}
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
          <button>Register</button>
        </form>
        <p>
          Already have an account?
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
