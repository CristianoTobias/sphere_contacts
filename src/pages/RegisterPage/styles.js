// RegisterStyles.js
import styled from "styled-components";
import { Link } from "react-router-dom";

export const RegisterContainer = styled.div`
  max-width: 300px; /* Largura máxima do formulário */
  margin: 120px auto; /* Centraliza o formulário na tela e ajusta a margem superior e inferior */
  padding: 20px; /* Espaçamento interno */
  border: 1px solid #ccc; /* Borda do formulário */
  border-radius: 5px; /* Bordas arredondadas */
  background-color:  #f0f0f0;

`;

export const Title = styled.h3`
  margin-bottom: 20px; /* Espaçamento abaixo do título */
`;

export const ErrorMessage = styled.div`
  margin-top: 20px; /* Espaçamento acima da mensagem de erro */
  font-size: 14px; /* Reduz o tamanho da fonte da mensagem de erro */
`;

export const SuccessMessage = styled.div`
  margin-top: 20px; /* Espaçamento acima da mensagem de sucesso */
  font-size: 14px; /* Reduz o tamanho da fonte da mensagem de sucesso */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0; /* Removendo o padding interno do formulário */
`;

export const Label = styled.label`
  margin-bottom: 5px; /* Espaçamento abaixo do label */
`;

export const Input = styled.input`
  padding: 8px; /* Espaçamento interno */
  margin-bottom: 10px; /* Espaçamento abaixo do input */
  border: 1px solid #ccc; /* Borda do input */
  border-radius: 3px; /* Bordas arredondadas */
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Espaçamento abaixo do checkbox */
`;

export const CheckboxLabel = styled.label`
  margin-left: 5px; /* Espaçamento à esquerda do label */
`;

export const Button = styled.button`
  background-color: #007bff; /* Cor de fundo do botão */
  color: #fff; /* Cor do texto no botão */
  border: none; /* Remover borda */
  padding: 8px 15px; /* Espaçamento interno */
  cursor: pointer; /* Altera o cursor para indicar que é clicável */
  border-radius: 3px; /* Bordas arredondadas */
  transition: background-color 0.3s; /* Transição suave de cor de fundo */

  &:hover {
    background-color: #0056b3; /* Cor de fundo do botão ao passar o mouse */
  }
`;

export const LoginLink = styled.p`
  margin-top: 20px; /* Espaçamento acima do link de login */
`;

export const LinkText = styled(Link)`
  color: #007bff; /* Cor do link */
  text-decoration: none; /* Remove o sublinhado do link */
  margin-left: 5px; /* Espaçamento à esquerda do link */
`;
