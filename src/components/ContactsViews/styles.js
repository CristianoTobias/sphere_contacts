// styles.js

import styled from "styled-components";

export const ContactsContainer = styled.div`
  margin-top: 0px;
  position: fixed;
  width: 400px;
  display: flex;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const ContactItemContainer = styled.div`
  border-bottom: 1px solid #ccc;
  overflow-y: hidden; /* Oculta a barra de rolagem vertical por padrão */
  overflow-x: hidden; /* Oculta a barra de rolagem horizontal */
  background-color: #f0f0f0;
  border-bottom: none;
  max-height: calc(100vh - 170px);
  width: 100%;
  position: relative;
  height: 100%; /* Ocupa 100% da altura do container pai */
  overflow-y: hidden;

  &:hover {
    overflow-y: auto; /* Exibe a barra de rolagem vertical durante o hover */
    transition: overflow-y 0.3s; /* Adiciona transição para suavizar o efeito de aparecimento da barra de rolagem */
  }
`;

export const Input = styled.input`
  position: sticky;
  top: 0;
  left: 0;
  margin-bottom: 10px;
  padding: 5px;
  width: 350px;
  z-index: 3;
`;

export const LetterHeader = styled.h2`
  position: sticky;
  background-color: #f0f0f0;
  top: 0;
  z-index: 1;
  font-size: 14px;
  color: #333333;
  border-bottom: 1px solid #333333;
  margin-top: 30px;
`;

export const AlphabetBar = styled.div`
  display: flex;
  width: 20px;
  flex-direction: column;
  margin-left: 20px;
  margin-top: -30px;
`;

export const AlphabetLetter = styled.div`
  cursor: pointer;
  font-size: 13px;
  color: #00008b;
  font-weight: bolder;
  &:hover {
    background-color: #00008b;
    color: #fff;
    border-radius: 3px;
  }
`;

export const ContactName = styled.p`
  cursor: pointer;
  border-bottom: 1px solid #333333;
  font-weight: bolder;
`;

export const NoContacts = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
  width: 100%;
`;
