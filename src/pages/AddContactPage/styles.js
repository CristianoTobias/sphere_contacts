import styled from "styled-components";

// Define estilos para o container do formulário
const FormContainer = styled.div`
  width: 330px; /* Define uma largura para o formulário */
  margin: 100px auto; /* Centraliza horizontalmente */
  padding: 10px; /* Adiciona um espaço interno */
  border: 1px solid #ccc; /* Borda do formulário */
  border-radius: 5px; /* Borda arredondada */
  background-color: #f0f0f0; /* Cor de fundo */
  color: #007bff; /* Cor do texto */

  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center; /* Centraliza o texto */
  }

  form {
    display: grid; /* Layout de grade para os elementos do formulário */
    gap: 5px; /* Espaçamento entre os elementos */
  }

  label {
    font-weight: bold; /* Texto em negrito */
    margin-top: 0; /* Remove a margem superior padrão */
  }

  input {
    padding: 8px; /* Espaçamento interno */
    border-radius: 4px; /* Borda arredondada */
    border: 1px solid #ccc; /* Borda */
    width: 100%; /* Largura total */
    box-sizing: border-box; /* Inclui o preenchimento e a borda na largura total */
  }

  button {
    padding: 10px 20px; /* Espaçamento interno */
    background-color: #007bff; /* Cor de fundo do botão */
    color: #fff; /* Cor do texto */
    border: none; /* Remove a borda */
    border-radius: 4px; /* Borda arredondada */
    cursor: pointer; /* Cursor do mouse */
    width: 300px; /* Largura do botão */
    margin: 0 auto; /* Centraliza horizontalmente */
    &:hover {
      background-color: #0056b3; /* Cor de fundo do botão ao passar o mouse */
    }
  }

  /* Estilizando o botão Cancel */
  button.cancel {
    background-color: #dc3545; /* Cor de fundo */
    width: 300px; /* Largura */
    margin: 0 auto; /* Centraliza horizontalmente */
    &:hover {
      background-color: #c82333; /* Cor de fundo ao passar o mouse */
    }
  }

  /* Estilos para a mensagem de erro/sucesso */
  .msg-error-sucess {
    height: 20px; /* Altura da mensagem */
    margin-bottom: 10px; /* Espaçamento inferior */
  }

  @media only screen and (max-width: 768px) {
    /* Estilos específicos para dispositivos móveis */
    margin-top: 150px; /* Margem superior */
  }
`;

// Define estilos para mensagem de erro
export const ErrorMessage = styled.p`
  color: red; /* Cor do texto */
  font-size: 12px; /* Tamanho da fonte */
  margin-top: 2px; /* Margem superior */
  margin-bottom: 2px; /* Margem inferior */
  width: 100%; /* Largura total */
  height: 15px; /* Altura */
`;

// Define estilos para mensagem de sucesso
export const SuccessMessage = styled.div`
  color: green; /* Cor do texto */
  font-size: 14px; /* Tamanho da fonte */
  margin-top: 2px; /* Margem superior */
  width: 100%; /* Largura total */
  height: 15px; /* Altura */
`;

export default FormContainer;
