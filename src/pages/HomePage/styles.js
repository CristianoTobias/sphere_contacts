// Importa a biblioteca styled-components para criar estilos CSS
import styled from "styled-components";

// Define o estilo para o container da página inicial
export const HomePageContainer = styled.div`
  /* Define um layout de grid com duas colunas (para desktop) ou uma coluna (para dispositivos móveis) */
  display: grid;
  gap: 10px; /* Define o espaçamento entre os elementos do grid */
  grid-template-columns: ${({ isAuthenticated }) =>
    isAuthenticated ? "2fr 3fr" : "1fr"}; /* Define a distribuição das colunas */
  overflow: hidden; /* Esconde qualquer conteúdo que exceda as dimensões do container */
  z-index: 1; /* Define a ordem de empilhamento do container */
  height: 100vh; /* Define a altura total da viewport */
  max-width: 1024px; /* Define a largura máxima do container */
  width: 100%; /* Define a largura do container como 100% */
  margin: 0 auto; /* Centraliza o container horizontalmente */
  padding-top: 90px; /* Adiciona espaço superior ao container */
  /* Define estilos específicos para dispositivos móveis usando media queries */
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr; /* Define uma única coluna para dispositivos móveis */
    grid-template-rows: auto auto; /* Define as linhas do grid para dispositivos móveis */
    padding-top: 130px; /* Adiciona mais espaço superior para dispositivos móveis */
  }
`;

// Define os estilos para o painel esquerdo da página inicial
export const LeftPanel = styled.div`
  position: relative; /* Define a posição do painel como relativa */
  background-color: #f0f0f0; /* Define a cor de fundo do painel */
  padding: 20px; /* Adiciona espaço interno ao painel */
  display: ${({ isAuthenticated }) => (isAuthenticated ? "block" : "none")}; /* Mostra ou oculta o painel com base na autenticação */
  width: 100%; /* Define a largura do painel como 100% */
  grid-column: 1; /* Define que o painel inicia na primeira coluna do grid */
  /* Define estilos específicos para dispositivos móveis usando media queries */
  @media only screen and (max-width: 768px) {
    width: 100%; /* Define a largura do painel como 100% para dispositivos móveis */
    height: 100vh; /* Define a altura do painel como 100% da viewport para dispositivos móveis */
  }
`;

// Define os estilos para o painel direito da página inicial
export const RightPanel = styled.div`
  background-color: #f8f8f8; /* Define a cor de fundo do painel */
  padding: ${({ isAuthenticated }) => (isAuthenticated ? "20px" : "0")}; /* Adiciona espaço interno ao painel apenas se estiver autenticado */
  display: ${({ isAuthenticated }) => (isAuthenticated ? "block" : "none")}; /* Mostra ou oculta o painel com base na autenticação */
  grid-column: 2; /* Define que o painel inicia na segunda coluna do grid */
  /* Define estilos específicos para dispositivos móveis usando media queries */
  @media only screen and (max-width: 768px) {
    width: 100%; /* Define a largura do painel como 100% para dispositivos móveis */
    height: auto; /* Define a altura do painel como automática para dispositivos móveis */
    grid-column: 1; /* Define que o painel inicia na primeira coluna do grid para dispositivos móveis */
  }
`;

// Define os estilos para mensagens de texto na página inicial
export const Message = styled.p`
  font-size: 18px; /* Define o tamanho da fonte */
  color: #333; /* Define a cor do texto */
  text-align: center; /* Alinha o texto ao centro */
`;

// Define os estilos para mensagens de erro na página inicial
export const ErrorMessage = styled.span`
  color: red; /* Define a cor do texto como vermelho */
  font-size: 14px; /* Define o tamanho da fonte */
`;

// Define os estilos para o botão "Voltar" na página inicial
export const BackButton = styled.button`
  padding: 10px 20px; /* Adiciona espaçamento interno ao botão */
  margin-bottom: 20px; /* Adiciona margem inferior ao botão */
  background-color: #007bff; /* Define a cor de fundo do botão */
  color: white; /* Define a cor do texto como branco */
  border: none; /* Remove a borda do botão */
  border-radius: 5px; /* Adiciona borda arredondada ao botão */
  cursor: pointer; /* Define o cursor do mouse como ponteiro */
  /* Define estilos de hover para o botão */
  &:hover {
    background-color: #0056b3; /* Altera a cor de fundo ao passar o mouse sobre o botão */
  }
`;
