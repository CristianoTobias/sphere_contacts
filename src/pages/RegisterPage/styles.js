import styled from "styled-components"; // Importa a biblioteca styled-components para criar componentes estilizados
import { Link } from "react-router-dom"; // Importa o componente Link do react-router-dom para navegação interna

// Define o contêiner principal para o formulário de registro
export const RegisterContainer = styled.div`
  max-width: 400px; // Largura máxima do contêiner
  margin: 100px auto; // Margem para centralizar verticalmente e horizontalmente
  padding: 20px; // Espaçamento interno do contêiner
  border: 1px solid #ccc; // Borda com cor cinza claro
  border-radius: 5px; // Bordas arredondadas
  background-color: #f0f0f0; // Cor de fundo cinza claro
  color: #1E395B; // Cor do texto
`;

// Define o título do formulário de registro
export const Title = styled.h2`
  margin-bottom: 15px; // Espaçamento inferior
  text-align: center; // Alinha o texto ao centro
`;

// Define a mensagem de erro ou sucesso
export const Message = styled.p`
  color: ${(props) => (props.type === "success" ? "green" : "red")}; // Cor verde para sucesso e vermelha para erro
  font-size: 12px; // Tamanho da fonte
  margin: 0.5em 0; // Margem superior e inferior
  height: 20px; // Altura fixa para manter o espaço reservado
`;

// Define o estilo do formulário
export const Form = styled.form`
  display: flex; // Define um layout flexível
  flex-direction: column; // Coloca os elementos em coluna
  padding: 0; // Remove qualquer padding adicional
`;

// Define o estilo dos rótulos
export const Label = styled.label`
  margin-bottom: 5px; // Espaçamento inferior
`;

// Define o estilo dos campos de entrada
export const Input = styled.input`
  padding: 8px; // Espaçamento interno
  margin-bottom: 10px; // Espaçamento inferior
  border: 1px solid #ccc; // Borda com cor cinza claro
  border-radius: 3px; // Bordas arredondadas
`;

// Define o contêiner para o checkbox
export const CheckboxContainer = styled.div`
  display: flex; // Define um layout flexível
  align-items: center; // Alinha os itens ao centro
  margin-bottom: 5px; // Espaçamento inferior
`;

// Define o estilo do rótulo do checkbox
export const CheckboxLabel = styled.label`
  margin-left: 5px; // Espaçamento à esquerda
`;

// Define o estilo do botão de envio
export const Button = styled.button`
  background-color: #007bff; // Cor de fundo azul
  color: #fff; // Cor do texto branca
  border: none; // Remove qualquer borda padrão
  padding: 8px 15px; // Espaçamento interno
  cursor: pointer; // Muda o cursor para indicar clicabilidade
  border-radius: 3px; // Bordas arredondadas
  width: 200px; // Largura fixa do botão
  margin: 0 auto; // Centraliza o botão horizontalmente
  transition: background-color 0.3s; // Transição suave para mudança de cor de fundo
  &:hover {
    background-color: #0056b3; // Cor de fundo ao passar o mouse
  }
`;

// Define o estilo do parágrafo que contém o link para login
export const LoginLink = styled.p`
  margin-top: 10px; // Espaçamento superior
`;

// Define o estilo do link de navegação para a página de login
export const LinkText = styled(Link)`
  color: #007bff; // Cor do link azul
  text-decoration: none; // Remove a sublinha padrão dos links
  margin-left: 5px; // Espaçamento à esquerda
`;
