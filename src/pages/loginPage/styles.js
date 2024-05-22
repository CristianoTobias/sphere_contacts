import styled from "styled-components"; // Importa a biblioteca styled-components para criar componentes estilizados
import { Link } from "react-router-dom"; // Importa o componente Link do react-router-dom para navegação

// Contêiner principal para o formulário de login, centralizando e estilizando o formulário
export const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px; // Define a largura máxima do contêiner
  margin: auto; // Centraliza o contêiner horizontalmente
  padding: 20px; // Adiciona padding interno
  margin-top: 100px; // Adiciona espaço acima do contêiner
  border: 1px solid #ccc; // Adiciona uma borda cinza clara ao contêiner
  border-radius: 5px; // Arredonda os cantos do contêiner
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // Adiciona uma sombra sutil ao contêiner
  background-color: #f0f0f0; // Define a cor de fundo do contêiner
  color: #1E395B; // Define a cor do texto no contêiner
`;

// Estilo para o título do formulário de login
export const Title = styled.h2`
  margin-bottom: 20px; // Adiciona margem inferior
  text-align: center; // Centraliza o texto
`;

// Estilo para a mensagem de erro
export const ErrorMessage = styled.div`
  color: red; // Define a cor do texto como vermelho
  margin-bottom: 10px; // Adiciona margem inferior
  font-size: 12px; // Define o tamanho da fonte
`;

// Estilo para o formulário, organizando os elementos em uma coluna
export const Form = styled.form`
  display: flex; // Define um layout flexível
  flex-direction: column; // Organiza os elementos em uma coluna
`;

// Estilo para os rótulos dos campos de entrada
export const Label = styled.label`
  margin-bottom: 5px; // Adiciona margem inferior
  font-weight: bold; // Define o peso da fonte como negrito
`;

// Estilo para os campos de entrada
export const Input = styled.input`
  margin-bottom: 10px; // Adiciona margem inferior
  padding: 10px; // Adiciona padding interno
  border: 1px solid #ccc; // Adiciona uma borda cinza clara
  border-radius: 5px; // Arredonda os cantos do campo de entrada
`;

// Contêiner para o checkbox e seu rótulo
export const CheckboxContainer = styled.div`
  display: flex; // Define um layout flexível
  align-items: center; // Alinha os itens no centro verticalmente
  margin-bottom: 10px; // Adiciona margem inferior
`;

// Estilo para o rótulo do checkbox
export const CheckboxLabel = styled.label`
  margin-left: 5px; // Adiciona margem à esquerda
`;

// Estilo para o botão de login
export const Button = styled.button`
  padding: 10px; // Adiciona padding interno
  border: none; // Remove a borda padrão
  border-radius: 5px; // Arredonda os cantos do botão
  background-color: #007bff; // Define a cor de fundo do botão
  color: white; // Define a cor do texto do botão
  cursor: pointer; // Altera o cursor para indicar que o botão é clicável
  width: 200px; // Define a largura do botão
  margin: 0 auto; // Centraliza o botão horizontalmente

  &:disabled { // Estilo para o botão quando desabilitado
    background-color: #ccc; // Define a cor de fundo cinza
    cursor: not-allowed; // Altera o cursor para indicar que o botão não é clicável
  }
`;

// Contêiner para o link de registro
export const RegisterLink = styled.div`
  margin-top: 20px; // Adiciona margem superior
  text-align: center; // Centraliza o texto
`;

// Estilo para o texto do link de registro
export const LinkText = styled(Link)`
  color: #007bff; // Define a cor do texto do link
  text-decoration: none; // Remove a sublinhado padrão do link

  &:hover { // Estilo para o link quando o mouse passa sobre ele
    text-decoration: underline; // Adiciona sublinhado ao texto do link
  }
`;

// Estilo para a área de mensagens de erro ou sucesso
export const Error = styled.p`
  height: 20px; // Define a altura da área
`;

// Estilo para a mensagem de sucesso
export const SuccessMessage = styled.div`
  color: green; // Define a cor do texto como verde
  margin: 10px 0; // Adiciona margem vertical
`;
