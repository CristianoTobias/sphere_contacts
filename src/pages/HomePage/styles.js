/* styles.js */
import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  height: 100vh; /* Altura total da viewport */
  overflow: hidden;
  z-index: 1;
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 90px;
`;

export const LeftPanel = styled.div`
  width: ${({ isAuthenticated }) => (isAuthenticated ? "40%" : "100%")};
  background-color: #f0f0f0; /* Cor de fundo suave */
  padding: 20px; /* Adicionando algum espaço interno */
  display: flex;
`;

export const RightPanel = styled.div`
  width: ${({ isAuthenticated }) => (isAuthenticated ? "60%" : "0%")};
  background-color: #f8f8f8; /* Cor de fundo suave */
  padding: ${({ isAuthenticated }) =>
    isAuthenticated
      ? "20px"
      : "0"}; /* Adicionando espaço interno somente se estiver logado */
`;

export const Message = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;
  padding-top: 100px;
  padding-left: 200px;
`;
