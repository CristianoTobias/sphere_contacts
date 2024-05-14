// NavbarStyles.js
import styled from "styled-components";

export const NavContainer = styled.nav`
  position: fixed; /* Fixa a navbar no topo */
  top: 0; /* Alinha a navbar no topo da página */
  left: 0; /* Alinha a navbar à esquerda da página */
  width: 100%;
  background-color: #1e90ff; /* Cor de fundo do navbar */
  color: #fff; /* Cor do texto no navbar */
  padding: 10px 20px; /* Espaçamento interno */
  display: flex; /* Alinhar os itens horizontalmente */
  justify-content: space-between; /* Espaço uniforme entre os itens */
  align-items: center; /* Alinhar os itens verticalmente */
  z-index: 2;
`;

export const Logo = styled.h1`
  font-size: 25px;
`;

export const UserInfo = styled.div`
  display: flex; /* Alinhar os itens horizontalmente */
  align-items: center; /* Alinhar os itens verticalmente */
`;

export const ButtonContainer = styled.div`
  display: flex; /* Alinhar os itens horizontalmente */
  gap: 10px; /* Adicionar espaço entre os botões */
  padding-right: 50px;
`;

export const Button = styled.button`
  color: #fff; /* Cor do texto no botão */
  border: none; /* Remover borda */
  padding: 8px 15px; /* Espaçamento interno */
  cursor: pointer; /* Altera o cursor para indicar que é clicável */
  transition: background-color 0.3s; /* Transição suave de cor de fundo */
  width: 100px; /* Largura fixa para os botões */
`;

export const UserName = styled.p`
  margin-right: 10px; /* Espaçamento à direita */
`;

export const LogoutButton = styled(Button)`
  background-color: #696969; /* Cor de fundo do botão de logout */
  border-radius: 3px;

  &:hover {
    background-color: #A9A9A9; /* Cor de fundo do botão ao passar o mouse */
  }
`;

export const AuthButton = styled(Button)`
  background-color: #228B22; /* Cor de fundo do botão de autenticação */

  &:hover {
    background-color: #006400; /* Cor de fundo do botão ao passar o mouse */
  }
`;
