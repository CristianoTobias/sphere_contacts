import styled from "styled-components";
import { Link } from "react-router-dom";

export const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #1E395B;
`;

export const Title = styled.h2`
  margin-bottom: 15px;
  text-align: center;
`;

export const Error = styled.p`
  height: 20px;
`;

export const ErrorMessage = styled.div`
  color: red;
`;

export const SuccessMessage = styled.div`
  color: green;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const CheckboxLabel = styled.label`
  margin-left: 5px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 15px; /* Reduzindo o padding horizontal do botão */
  cursor: pointer;
  border-radius: 3px;
  width: 200px;
  margin: 0 auto;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

export const LoginLink = styled.p`
  margin-top: 10px;
`;

export const LinkText = styled(Link)`
  color: #007bff;
  text-decoration: none;
  margin-left: 5px;
`;
