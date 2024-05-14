// AddContactForm.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewContact } from "../../features/slices/contactsSlice";
import FormContainer, { ErrorMessage } from "./styles"; // Importa o estilo do componente
import { useNavigate } from "react-router-dom"; // Importa useHistory para redirecionar o usuário
import InputMask from 'react-input-mask'; // Importa o componente InputMask

// Função para capitalizar o nome e o sobrenome e remover espaços em branco extras
const capitalizeName = (fullName) => {
  // Remove espaços em branco extras e divide o nome completo em partes (nome e sobrenome) usando um espaço como separador
  const parts = fullName.trim().split(" ");
  // Mapeia cada parte e capitaliza a primeira letra de cada uma
  const capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
  // Junta as partes capitalizadas novamente em um único nome e retorna
  return capitalizedParts.join(" ");
};

const AddContactForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Instancia useHistory
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefoneError, setTelefoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o envio do formulário

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Name is required");
    } else if (!/^[A-Za-z]{3,}/.test(value)) {
      setNameError(
        "Name must start with a letter and have at least three letters"
      );
    } else {
      setNameError("");
    }
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validateTelefone = (value) => {
    if (!value.trim()) {
      setTelefoneError("Telefone is required");
    } else if (!/^\(\d{2}\)\d{5}-\d{4}$/.test(value)) {
      setTelefoneError("Invalid telefone format");
    } else {
      setTelefoneError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Define que o formulário está sendo enviado
    validateName(formData.name);
    validateEmail(formData.email);
    validateTelefone(formData.telefone);
    if (!nameError && !emailError && !telefoneError) {
      // Capitaliza o nome antes de salvar os dados do contato
      const capitalizedFormData = {
        ...formData,
        name: capitalizeName(formData.name)
      };
      dispatch(addNewContact(capitalizedFormData));
      setFormData({
        name: "",
        email: "",
        telefone: "",
      });
      // Redireciona para a página inicial após um curto intervalo de tempo (3 segundos)
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  useEffect(() => {
    // Limpar erros quando o formulário for enviado
    if (isSubmitting && !nameError && !emailError && !telefoneError) {
      setNameError("");
      setEmailError("");
      setTelefoneError("");
    }
  }, [isSubmitting, nameError, emailError, telefoneError]);

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <FormContainer>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => {
              handleChange(e);
              validateName(e.target.value);
            }}
            required
            disabled={isSubmitting} // Desabilita o campo se o formulário estiver sendo enviado
          />
          <ErrorMessage>{nameError}</ErrorMessage>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              handleChange(e);
              validateEmail(e.target.value);
            }}
            required
            disabled={isSubmitting} // Desabilita o campo se o formulário estiver sendo enviado
          />
           <ErrorMessage>{emailError}</ErrorMessage>
        </div>
        <div>
          <label htmlFor="telefone">Phone:</label>
          <InputMask
            mask="(99)99999-9999"
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={(e) => {
              handleChange(e);
              validateTelefone(e.target.value);
            }}
            required
            disabled={isSubmitting} // Desabilita o campo se o formulário estiver sendo enviado
          />
          <ErrorMessage>{telefoneError}</ErrorMessage>
        </div>
        <button type="submit" disabled={isSubmitting}>
          Add Contact
        </button>
      </form>
      <button className="cancel" onClick={handleCancel}>Cancel</button>
    </FormContainer>
  );
};

export default AddContactForm;
