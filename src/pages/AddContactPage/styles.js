// AddContactFormStyle.js
import styled from "styled-components";

const FormContainer = styled.div`
  width: 300px; /* Definindo uma largura para o formulário */
  margin: 100px auto; /* Centralizando horizontalmente */
  padding: 10px; /* Adicionando um espaço interno */
  border: 1px solid #ccc; /* Borda do formulário */
  border-radius: 5px;
  background-color: #f0f0f0;

  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  form {
    display: grid;
    gap: 10px;
  }

  label {
    font-weight: bold;
    margin-top: 0;
  }

  input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #0056b3; /* Azul mais escuro para hover */
    }
  }

  /* Estilizando o botão Cancel */
  button.cancel {
    background-color: #dc3545; /* Cor de fundo vermelha */
    margin-top: 10px; /* Adicionando margem superior */
    width: 100%;
    &:hover {
      background-color: #c82333;
    }
  }
`;

export default FormContainer;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 2px;
  width: 100%;
  height: 15px;
`;
