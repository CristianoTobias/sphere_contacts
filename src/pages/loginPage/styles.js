import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  margin-top: 100px; /* Adicionado espaçamento superior */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  color: #1E395B;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const CheckboxLabel = styled.label`
  margin-left: 5px;
`;

export const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  width: 200px;
  margin: 0 auto;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const RegisterLink = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export const LinkText = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
export const Error = styled.p`
  height: 20px;
`;
export const SuccessMessage = styled.div`
  color: green;
  margin: 10px 0;
`;