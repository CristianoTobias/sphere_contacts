import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { login } from "../../features/slices/authSlice";
import {
  LoginContainer,
  Title,
  ErrorMessage,
  Form,
  Label,
  Input,
  CheckboxContainer,
  CheckboxLabel,
  Button,
  RegisterLink,
  LinkText,
} from "./styles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputUsername = (e) => setUsername(e.target.value);
  const handleInputPassword = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setCheck((prevState) => !prevState);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await dispatch(login({ username, password }));
      setUsername("");
      setPassword("");
      setSuccessMsg("Login successful!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error during login:", error);
      if (!error.originalStatus) {
        setErrMsg(error.response?.data?.detail);
      } else if (error.originalStatus === 400) {
        setErrMsg(error.response?.data?.detail);
      } else if (error.originalStatus === 401) {
        setErrMsg(error.response?.data?.detail);
      } else {
        setErrMsg("Login Failed.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <ErrorMessage>
        {errMsg && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{errMsg}</Alert>
          </Stack>
        )}
      </ErrorMessage>
      {successMsg && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{successMsg}</Alert>
        </Stack>
      )}
      <Form onSubmit={handleLogin}>
        <Label>Username:</Label>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={handleInputUsername}
          required
          disabled={isSubmitting || successMsg}
        />
        <Label>Password:</Label>
        <Input
          type={check ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleInputPassword}
          required
          disabled={isSubmitting || successMsg}
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={check}
            onChange={togglePasswordVisibility}
            disabled={isSubmitting || successMsg}
          />
          <CheckboxLabel>Show password</CheckboxLabel>
        </CheckboxContainer>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </Form>
      <RegisterLink>
        Don't have an account?
        <LinkText to="/register">Register</LinkText>
      </RegisterLink>
    </LoginContainer>
  );
};

export default Login;
