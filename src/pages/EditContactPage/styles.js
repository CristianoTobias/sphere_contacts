import styled from "styled-components";

// Container do formulário com estilos para centralização e aparência
export const FormContainer = styled.div`
  max-width: 400px; // Largura máxima do container
  margin: 120px auto; // Margem para centralizar verticalmente e horizontalmente
  padding: 10px; // Espaçamento interno
  background-color: #f9f9f9; // Cor de fundo
  border: 1px solid #cecece; // Borda com cor cinza clara
  border-radius: 8px; // Bordas arredondadas
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // Sombra para profundidade
  background-color: #f0f0f0; // Cor de fundo (duplicada, pode remover uma)
  padding: 10px 20px; // Espaçamento interno (duplicado, pode remover uma)
  @media only screen and (max-width: 768px) {
    /* Estilos específicos para dispositivos móveis */
    margin-top: 150px; // Margem superior aumentada em dispositivos móveis
  }
`;

// Grupo de formulário com margem inferior
export const FormGroup = styled.div`
  margin-bottom: 2px; // Margem inferior pequena
`;

// Estilo para os labels dos inputs
export const Label = styled.label`
  display: block; // Display em bloco
  margin-bottom: 5px; // Margem inferior pequena
`;

// Estilo para os inputs do formulário
export const Input = styled.input`
  width: 100%; // Largura total do container pai
  padding: 8px; // Espaçamento interno
  border: 1px solid #ccc; // Borda com cor cinza clara
  border-radius: 4px; // Bordas arredondadas
`;

// Estilo para o botão principal
export const Button = styled.button`
  padding: 10px 20px; // Espaçamento interno
  background-color: #007bff; // Cor de fundo azul
  color: #fff; // Cor do texto branca
  border: none; // Sem borda
  border-radius: 4px; // Bordas arredondadas
  cursor: pointer; // Cursor de ponteiro ao passar o mouse
  transition: background-color 0.3s ease; // Transição suave para mudança de cor
  width: 100px; // Largura fixa

  &:hover {
    background-color: #0056b3; // Cor de fundo ao passar o mouse
  }

  &:not(:last-child) {
    margin-right: 10px; // Margem direita para botões que não são o último filho
  }
`;

// Estilo para o botão de cancelar, reutilizando o estilo do botão principal
export const ButtonCancel = styled(Button)`
  background-color: #dc3545; // Cor de fundo vermelha
  &:hover {
    background-color: #ff3333; // Cor de fundo ao passar o mouse
  }
`;

// Estilo para mensagens de erro
export const ErrorMessage = styled.p`
  color: red; // Cor do texto vermelha
  font-size: 14px; // Tamanho da fonte
  margin-top: 5px; // Margem superior pequena
  width: 100%; // Largura total do container pai
  height: 15px; // Altura fixa
`;

// Estilo para mensagens de feedback (sucesso ou erro)
export const Message = styled.p`
  color: ${(props) => (props.type === "success" ? "green" : "red")}; // Cor do texto verde para sucesso e vermelha para erro
  font-size: 14px; // Tamanho da fonte
  margin: 0.5em 0; // Margem vertical
  height: 15px; // Altura fixa
`;
