import React, { useState, useEffect } from "react"; // Importa React e hooks useState e useEffect
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate do react-router-dom para navegação
import axios from "axios"; // Importa axios para fazer requisições HTTP
import {
  RegisterContainer,
  Title,
  Message,
  Form,
  Label,
  Input,
  CheckboxContainer,
  CheckboxLabel,
  Button,
  LoginLink,
  LinkText,
} from "./styles"; // Importa componentes estilizados do arquivo de estilos

// Função para verificar a similaridade entre duas strings
function checkSimilarity(str1, str2) {
  const similarityThreshold = 0.3; // Define um limiar de similaridade
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
  const navigate = useNavigate(); // Hook para navegação
  const [username, setUsername] = useState(""); // Estado para armazenar o nome de usuário
  const [password, setPassword] = useState(""); // Estado para armazenar a senha
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para armazenar a confirmação da senha
  const [message, setMessage] = useState({ text: "", type: "" }); // Estado para armazenar mensagens de erro ou sucesso
  const [check, setCheck] = useState(false); // Estado para controlar a visibilidade da senha

  // Funções para atualizar os estados dos campos de entrada
  const handleInputUsername = (e) => {
    setUsername(e.target.value);
    setMessage({ text: "", type: "" });
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
    setMessage({ text: "", type: "" });
  };

  const handleInputConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setMessage({ text: "", type: "" });
  };

  const togglePasswordVisibility = () => {
    setCheck((prevState) => !prevState);
  };

  // Função para verificar sequências repetidas na senha
  function hasRepeatedSequences(str) {
    const repeatingSequences = /(.)\1{2,}/g;
    return repeatingSequences.test(str);
  }

  // Efeito para redirecionar após o registro bem-sucedido
  useEffect(() => {
    let timer;
    if (message.type === "success") {
      timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
        navigate("/login");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [message, navigate]);

  const apiUrl = process.env.REACT_APP_API_URL; // URL da API

  // Função para tratar o envio do formulário de registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    setUsername(trimmedUsername);
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasRepeated = hasRepeatedSequences(password);

    // Verificações de validação da senha
    if (!hasLetters || !hasNumbers || !hasSpecialChars || hasRepeated) {
      setMessage({
        text: "Password must contain letters, numbers, and at least one special character, and should not have repeating sequences!",
        type: "error",
      });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    if (password.length < 8) {
      setMessage({
        text: "Password must be at least 8 characters long!",
        type: "error",
      });
      return;
    }

    const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (!specialChars.test(password)) {
      setMessage({
        text: "Password must contain at least one special character!",
        type: "error",
      });
      return;
    }

    const usernameParts = trimmedUsername.split(/[@/./+/-/_]/);
    for (const part of usernameParts) {
      if (
        part.length > 0 &&
        password.toLowerCase().includes(part.toLowerCase())
      ) {
        setMessage({
          text: "Password cannot contain parts of your username!",
          type: "error",
        });
        return;
      }
    }

    if (password.toLowerCase().includes(trimmedUsername.toLowerCase())) {
      setMessage({
        text: "Password cannot contain your username!",
        type: "error",
      });
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9@/./+/-/_]{1,150}$/;
    if (!usernameRegex.test(trimmedUsername)) {
      setMessage({ text: "Invalid username format!", type: "error" });
      return;
    }

    if (checkSimilarity(password, trimmedUsername)) {
      setMessage({
        text: "Password is too similar to your username!",
        type: "error",
      });
      return;
    }

    try {
      // Envio dos dados para a API
      await axios.post(`${apiUrl}/useregist/`, {
        username: trimmedUsername,
        password: password,
      });

      setMessage({
        text: "Successfully registered, please log in!",
        type: "success",
      });
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
        console.error("Error during registration:", error);
      if (
        error.response?.status === 500 &&
        error.response?.data?.includes(
          "UNIQUE constraint failed: auth_user.username"
        )
      ) {
        setMessage({
          text: "Username already exists. Please choose a different username.",
          type: "error",
        });
      } else if (error.message === "Network Error") {
        setMessage({
          text: "Network Error: Unable to reach the server.",
          type: "error",
        });
      } else if (error.response?.status === 400) {
        setMessage({
          text: "Invalid credentials. Please try again.",
          type: "error",
        });
      } else if (error.response?.status === 401) {
        setMessage({
          text: "Unauthorized.",
          type: "error",
        });
      } else {
        setMessage({
          text: "Registration Failed.",
          type: "error",
        });
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
          disabled={message.type === "success"}
        />
        <Label>Password:</Label>
        <Input
          type={check ? "text" : "password"}
          name="password"
          onChange={handleInputPassword}
          value={password}
          required
          disabled={message.type === "success"}
        />
        <Label>Confirm Password:</Label>
        <Input
          type={check ? "text" : "password"}
          name="confirm-password"
          onChange={handleInputConfirmPassword}
          value={confirmPassword}
          required
          disabled={message.type === "success"}
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={check}
            onChange={togglePasswordVisibility}
            disabled={message.type === "success"}
          />
          <CheckboxLabel>Show password</CheckboxLabel>
        </CheckboxContainer>
        <Message type={message.type}>{message.text}</Message>
        <Button type="submit" disabled={message.type === "success"}>
          {message.type === "success" ? "Registered!" : "Register"}
        </Button>
      </Form>
      <LoginLink>
        Already have an account? <LinkText to="/login">Log in</LinkText>
      </LoginLink>
    </RegisterContainer>
  );
};

export default Register;
