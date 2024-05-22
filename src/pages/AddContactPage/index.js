import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewContact } from "../../features/slices/contactsSlice"; // Importa a action para adicionar um novo contato
import { selectUser } from "../../features/slices/authSlice"; // Importa os seletores para obter informações do usuário e token de acesso
import FormContainer, { ErrorMessage, SuccessMessage } from "./styles"; // Importa os estilos do formulário
import { useNavigate } from "react-router-dom"; // Importa o hook de navegação
import InputMask from "react-input-mask"; // Importa o componente para formatar a entrada de telefone

// Função utilitária para capitalizar o nome
const capitalizeName = (fullName) => {
  const parts = fullName.trim().split(" ");
  const capitalizedParts = parts.map(
    (part) => part.charAt(0).toUpperCase() + part.slice(1)
  );
  return capitalizedParts.join(" ");
};

const AddContactForm = () => {
  const dispatch = useDispatch(); // Hook para despachar ação Redux
  const navigate = useNavigate(); // Hook para navegação
  const user = useSelector(selectUser); // Obtém informações do usuário do estado Redux
  const userId = user.user_id; // Obtém o ID do usuário

  // Estado local para os dados do formulário e mensagens de erro/sucesso
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    user: userId ? userId : null, // Define o usuário no formulário como o usuário logado, se disponível
  });
  const [nameError, setNameError] = useState(""); // Estado para mensagem de erro no campo de nome
  const [emailError, setEmailError] = useState(""); // Estado para mensagem de erro no campo de e-mail
  const [telefoneError, setTelefoneError] = useState(""); // Estado para mensagem de erro no campo de telefone
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para indicar se o formulário está sendo enviado
  const [errorMessage, setErrMsg] = useState(""); // Estado para mensagem de erro
  const [successMessage, setSuccessMsg] = useState(""); // Estado para mensagem de sucesso

  // Função para lidar com a mudança nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errorMessage) setErrMsg(""); // Limpa a mensagem de erro quando o usuário começa a digitar
  };

  // Funções para validar os campos do formulário
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
      setTelefoneError("Phone is required");
    } else if (!/^\(\d{2}\)\d{5}-\d{4}$/.test(value)) {
      setTelefoneError("Invalid phone format");
    } else {
      setTelefoneError("");
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos do formulário
    validateName(formData.name);
    validateEmail(formData.email);
    validateTelefone(formData.phone);

    // Verificação de erros de validação
    if (nameError || emailError || telefoneError) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    // Capitaliza o nome antes de enviar os dados
    const capitalizedFormData = {
      ...formData,
      name: capitalizeName(formData.name),
      user: userId,
    };

    try {
      // Despacha a ação assíncrona para adicionar um novo contato
      await dispatch(addNewContact(capitalizedFormData)).unwrap();
      setErrMsg("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        user: userId,
      });
      setSuccessMsg("Contact added successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/");
      }, 3000); // Redireciona para a página inicial após 3 segundos
    } catch (error) {
      // Trata os possíveis erros de adição de contato
      if (error.errorMessage === "Network Error") {
        setErrMsg("Network Error: Unable to reach the server.");
      } else if (error.status === 400) {
        setErrMsg("Bad request.");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized. Check your authentication token.");
      } else if (error === "duplicate") {
        setErrMsg("A contact with this name already exists.");
      } else if (error === "duplicatePhone") {
        setErrMsg("A contact with this phone number already exists.");
      } else {
        setErrMsg("Failed to add contact. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Efeito para limpar mensagens de erro quando o formulário é enviado novamente
  useEffect(() => {
    if (isSubmitting && !nameError && !emailError && !telefoneError) {
      setNameError(""); // Limpa o erro do nome
      setEmailError(""); // Limpa o erro do e-mail
      setTelefoneError(""); // Limpa o erro do telefone
    }
  }, [isSubmitting, nameError, emailError, telefoneError]);

  // Função para lidar com o cancelamento do formulário
  const handleCancel = () => {
    navigate("/"); // Redireciona para a página inicial
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
              handleInputChange(e);
              validateName(e.target.value);
            }}
            required
            disabled={isSubmitting}
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
              handleInputChange(e);
              validateEmail(e.target.value);
            }}
            required
            disabled={isSubmitting}
          />
          <ErrorMessage>{emailError}</ErrorMessage>
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <InputMask
            mask="(99)99999-9999"
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              handleInputChange(e);
              validateTelefone(e.target.value);
            }}
            required
            disabled={isSubmitting}
          />
          <ErrorMessage>{telefoneError}</ErrorMessage>
        </div>
        <div className="msg-error-sucess">
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding Contact..." : "Add Contact"}
        </button>
        <button className="cancel" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </FormContainer>
  );
};

export default AddContactForm;
