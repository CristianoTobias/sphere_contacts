import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/slices/authSlice";
import {
  LoginContainer,
  Title,
  ErrorMessage,
  SuccessMessage,
  Form,
  Label,
  Input,
  CheckboxContainer,
  CheckboxLabel,
  Button,
  RegisterLink,
  LinkText,
  Error,
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

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (errMsg) setErrMsg(""); // Limpa a mensagem de erro quando o usuário começa a digitar
  };

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
      if (error.message === "Network Error") {
        setErrMsg("Network Error: Unable to reach the server.");
      } else if (error.response?.status === 400) {
        setErrMsg("Invalid credentials. Please try again.");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized. Check your username and password.");
      } else {
        setErrMsg("Login Failed. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form onSubmit={handleLogin}>
        <Label>Username:</Label>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange(setUsername)}
          required
          disabled={isSubmitting || successMsg}
        />
        <Label>Password:</Label>
        <Input
          type={check ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleInputChange(setPassword)}
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
        <Error>
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
          {successMsg && <SuccessMessage>{successMsg}</SuccessMessage>}
        </Error>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </Form>
      <RegisterLink>
        Don't have an account? <LinkText to="/register">Register</LinkText>
      </RegisterLink>
    </LoginContainer>
  );
};

export default Login;
