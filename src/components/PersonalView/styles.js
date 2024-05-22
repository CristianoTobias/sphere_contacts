// Em PersonalContactStyles.js
import styled from "styled-components";

export const PersonalContactContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  position: relative;
  @media only screen and (max-width: 768px) {
    /* Estilos específicos para dispositivos móveis */
    max-width: 768px;
    
  }
`;

export const ContactHeader = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const InitialsCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  background-color: ${({ color }) => color};
  margin-right: 20px;
`;

export const ContactName = styled.h2`
  font-size: 1.5em;
  color: #333;
`;

export const ContactInfo = styled.div`
  margin-bottom: 20px;
`;

export const Email = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Phone = styled.p`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  span {
    font-size: 18px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 80px;
`;

export const Button = styled.button`
  background-color: #228b22;
  width: 100px;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export const ButtonDelete = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

export const Message = styled.p`
  font-size: 16px;
  color: #555555;
  margin-top: 150x;
`;

export const MessageError = styled.p`
position: absolute;
bottom: 60px;
left: 20px;
color: red;

`