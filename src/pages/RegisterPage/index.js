import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Error,
} from "./styles";

function checkSimilarity(str1, str2) {
  const similarityThreshold = 0.3; // Defina um limiar de similaridade adequado
  const minLength = Math.min(str1.length, str2.length);
  const maxLength = Math.max(str1.length, str2.length);
  let matchingChars = 0;

  for (let i = 0; i < minLength; i++) {
    if (str1[i].toLowerCase() === str2[i].toLowerCase()) {
      matchingChars++;
    }
  }

  const similarity = matchingChars / maxLength;
  return similarity >= similarityThreshold;
}

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [check, setCheck] = useState(false);
  const [inputChanged, setInputChanged] = useState(false); // Estado para controlar se houve alteração nos inputs

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
    setErrMsg(""); // Limpar mensagens de erro ao digitar
    setInputChanged(true); // Indicar que houve uma alteração no input
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
    setErrMsg("");
    setInputChanged(true);
  };

  const handleInputconfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setErrMsg("");
    setInputChanged(true);
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
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [successMsg, navigate]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");

    // Remover espaços em branco antes e depois do nome de usuário
    const trimmedUsername = username.trim();
    setUsername(trimmedUsername);

    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      setErrMsg("Password must be at least 8 characters long!");
      return;
    }

    const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (!specialChars.test(password)) {
      setErrMsg("Password must contain at least one special character!");
      return;
    }

    const usernameParts = trimmedUsername.split(/[@/./+/-/_]/);
    for (const part of usernameParts) {
      if (
        part.length > 0 &&
        password.toLowerCase().includes(part.toLowerCase())
      ) {
        setErrMsg("Password cannot contain parts of your username!");
        return;
      }
    }

    if (/^\d+$/.test(password)) {
      setErrMsg("Password cannot be entirely numeric!");
      return;
    }

    if (password.toLowerCase().includes(trimmedUsername.toLowerCase())) {
      setErrMsg("Password cannot contain your username!");
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9@/./+/-/_]{1,150}$/;
    if (!usernameRegex.test(trimmedUsername)) {
      setErrMsg("Invalid username format!");
      return;
    }

    if (checkSimilarity(password, trimmedUsername)) {
      setErrMsg("Password is too similar to your username!");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/useregist/`, {
        username: trimmedUsername,
        password: password,
      });

      if (response.status === 201) {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setSuccessMsg("Successfully registered, please log in!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (
        error.response?.status === 500 &&
        error.response?.data?.includes(
          "UNIQUE constraint failed: auth_user.username"
        )
      ) {
        setErrMsg(
          "Username already exists. Please choose a different username."
        );
      } else if (error.message === "Network Error") {
        setErrMsg("Network Error: Unable to reach the server.");
      } else if (error.response?.status === 400) {
        setErrMsg("Invalid credentials. Please try again.");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized.");
      } else {
        setErrMsg("Registration Failed.");
      }
    }
  };

  return (
    <RegisterContainer>
      <Title>Register</Title>
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
        <Error>
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
          {inputChanged && successMsg && (
            <SuccessMessage>{successMsg}</SuccessMessage>
          )}
        </Error>
        <Button type="submit" disabled={successMsg !== ""}>
          {successMsg ? "Registered!" : "Register"}
        </Button>
      </Form>
      <LoginLink>
        Already have an account? <LinkText to="/login">Log in</LinkText>
      </LoginLink>
    </RegisterContainer>
  );
};

export default Register;
