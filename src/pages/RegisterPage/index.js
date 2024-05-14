import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import {
  RegisterContainer,
  Title,
  ErrorMessage,
  SuccessMessage,
  Form,
  Label,
  Input,
  CheckboxContainer,
  CheckboxLabel,
  Button,
  LoginLink,
  LinkText,
} from "./styles";

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

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match!");
      return;
    }

    // Verificar se a senha tem pelo menos 8 caracteres
    if (password.length < 8) {
      setErrMsg("Password must be at least 8 characters long!");
      return;
    }
    // Verificar se a senha contém pelo menos um caractere especial
    const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (!specialChars.test(password)) {
      setErrMsg("Password must contain at least one special character!");
      return;
    }
    // Verificar se a senha contém partes do nome de usuário
    const usernameParts = username.split(/[@/./+/-/_]/);
    for (const part of usernameParts) {
      if (
        part.length > 0 &&
        password.toLowerCase().includes(part.toLowerCase())
      ) {
        setErrMsg("Password cannot contain parts of your username!");
        return;
      }
    }

    // Verificar se a senha não é apenas números
    if (/^\d+$/.test(password)) {
      setErrMsg("Password cannot be entirely numeric!");
      return;
    }

    // Verificar se a senha não é muito semelhante ao nome de usuário
    if (password.toLowerCase().includes(username.toLowerCase())) {
      setErrMsg("Password cannot contain your username!");
      return;
    }

    // Verificar o formato do username
    const usernameRegex = /^[a-zA-Z0-9@/./+/-/_]{1,150}$/;
    if (!usernameRegex.test(username)) {
      setErrMsg("Invalid username format!");
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
    <RegisterContainer>
      <Title>Register</Title>
      {errMsg && (
        <ErrorMessage>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{errMsg}</Alert>
          </Stack>
        </ErrorMessage>
      )}
      {successMsg && (
        <SuccessMessage>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">{successMsg}</Alert>
          </Stack>
        </SuccessMessage>
      )}
      <Form onSubmit={handleSubmit}>
        <Label>Username:</Label>
        <Input
          type="text"
          name="username"
          onChange={handleInputUsername}
          value={username}
          required
          disabled={successMsg !== ""}
        />
        <Label>Password:</Label>
        <Input
          type={check ? "text" : "password"}
          name="password"
          onChange={handleInputPassword}
          value={password}
          required
          disabled={successMsg !== ""}
        />
        <Label>Confirm Password:</Label>
        <Input
          type={check ? "text" : "password"}
          name="confirm-password"
          onChange={handleInputconfirmPassword}
          value={confirmPassword}
          required
          disabled={successMsg !== ""}
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={check}
            onChange={togglePasswordVisibility}
            disabled={successMsg !== ""}
          />
          <CheckboxLabel>Show password</CheckboxLabel>
        </CheckboxContainer>
        <Button type="submit" disabled={successMsg !== ""}>
          {successMsg ? "Registered!" : "Register"}
        </Button>
      </Form>
      <LoginLink>
        Already have an account?
        <LinkText to="/login">Log in</LinkText>
      </LoginLink>
    </RegisterContainer>
  );
};

export default Register;
