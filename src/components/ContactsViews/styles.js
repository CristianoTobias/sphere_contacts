import styled from "styled-components";

export const ContactsContainer = styled.div`
  margin-top: 0px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  
  @media only screen and (max-width: 1024px) {
    width: 100%;
    height: auto; /* Ajuste a altura automaticamente */
    position: relative; /* Alterar para relativo em dispositivos móveis */
  }

  @media only screen and (max-width: 768px) {
    /* Estilos específicos para dispositivos móveis */
    width: 100%;
    height: auto; /* Ajuste a altura automaticamente */
    position: relative; /* Alterar para relativo em dispositivos móveis */
  }
`;

export const ContactItemContainer = styled.div`
  border-bottom: 1px solid #ccc;
  overflow-y: hidden; /* Oculta a barra de rolagem vertical por padrão */
  overflow-x: hidden; /* Oculta a barra de rolagem horizontal */
  background-color: #f0f0f0;
  border-bottom: none;
  max-height: calc(100vh - 170px);
  position: relative;
  padding-bottom: 300px;
  &:hover {
    overflow-y: auto; /* Exibe a barra de rolagem vertical durante o hover */
    transition: overflow-y 0.3s; /* Adiciona transição para suavizar o efeito de aparecimento da barra de rolagem */
  }

  @media only screen and (max-width: 1024px) {
    max-width: 90%;
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    /* Estilos específicos para dispositivos móveis */
    max-width: 100%;
    width: 100%;
  }
`;

export const Input = styled.input`
  padding: 5px;
  width: 70%;
  height: 30px;
  z-index: 3;

  @media only screen and (max-width: 1024px) {
    
  }

  @media only screen and (max-width: 768px) {
    
  }
`;

export const LetterHeader = styled.h2`
  position: sticky;
  background-color: #f0f0f0;
  top: 0;
  z-index: 1;
  font-size: 14px;
  color: #cecece;
  border-bottom: 1px solid #333333;
  margin-top: 30px;
`;

export const AlphabetBar = styled.div`
  position: absolute;
  right: -20px;
  top: 0;
  display: flex;
  width: 20px;
  flex-direction: column;
  align-items: center;
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
