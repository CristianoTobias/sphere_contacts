import React, { useState } from "react"; // Importa React e o hook useState
import { useDispatch } from "react-redux"; // Importa o hook useDispatch do Redux
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para navegação
import { login } from "../../features/slices/authSlice"; // Importa a ação de login do slice de autenticação
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
} from "./styles"; // Importa os componentes estilizados

const Login = () => {
  // Define estados locais para gerenciar o nome de usuário, senha, visibilidade da senha, mensagens de erro e sucesso, e estado de submissão
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Hook para navegação
  const dispatch = useDispatch(); // Hook para disparar ações Redux

  // Função para atualizar o estado dos inputs e limpar mensagens de erro ao digitar
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (errMsg) setErrMsg("");
  };

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => setCheck((prevState) => !prevState);

  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    setIsSubmitting(true); // Define o estado de submissão como verdadeiro
  
    try {
      await dispatch(login({ username, password })); // Dispara a ação de login
      setErrMsg(""); // Limpa mensagens de erro
      setUsername(""); // Limpa o campo de nome de usuário
      setPassword(""); // Limpa o campo de senha
      setSuccessMsg("Login successful!"); // Define mensagem de sucesso
      setTimeout(() => {
        setSuccessMsg(""); // Limpa a mensagem de sucesso após 1 segundo
        navigate("/"); // Navega para a página inicial
      }, 1000);
    } catch (error) {
      // Define mensagens de erro com base no tipo de erro
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
      setIsSubmitting(false); // Define o estado de submissão como falso
    }
  };
  

  return (
    <LoginContainer>
      <Title>Login</Title> {/* Título do formulário */}
      <Form onSubmit={handleLogin}>
        <Label>Username:</Label>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange(setUsername)} // Atualiza o estado de nome de usuário
          required
          disabled={isSubmitting || successMsg} // Desabilita o input durante a submissão ou se o login for bem-sucedido
        />
        <Label>Password:</Label>
        <Input
          type={check ? "text" : "password"} // Alterna entre o tipo de input "text" e "password"
          name="password"
          value={password}
          onChange={handleInputChange(setPassword)} // Atualiza o estado de senha
          required
          disabled={isSubmitting || successMsg} // Desabilita o input durante a submissão ou se o login for bem-sucedido
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={check} // Controla o estado do checkbox
            onChange={togglePasswordVisibility} // Alterna a visibilidade da senha
            disabled={isSubmitting || successMsg} // Desabilita o checkbox durante a submissão ou se o login for bem-sucedido
          />
          <CheckboxLabel>Show password</CheckboxLabel>
        </CheckboxContainer>
        <Error>
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>} {/* Exibe mensagem de erro, se houver */}
          {successMsg && <SuccessMessage>{successMsg}</SuccessMessage>} {/* Exibe mensagem de sucesso, se houver */}
        </Error>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"} {/* Altera o texto do botão durante a submissão */}
        </Button>
      </Form>
      <RegisterLink>
        Don't have an account? <LinkText to="/register">Register</LinkText> {/* Link para a página de registro */}
      </RegisterLink>
    </LoginContainer>
  );
};

export default Login;
