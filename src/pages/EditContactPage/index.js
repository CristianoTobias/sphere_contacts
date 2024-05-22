import React, { useEffect, useState } from "react"; // Importa React e hooks useEffect e useState
import { useNavigate, useParams } from "react-router-dom"; // Importa hooks de navegação e parâmetros de URL
import { useDispatch, useSelector } from "react-redux"; // Importa hooks para interação com o Redux
import {
  selectFilteredContactById,
  updateContact,
} from "../../features/slices/contactsSlice"; // Importa selectors e actions do slice de contatos
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorMessage,
  ButtonCancel,
  Message,
} from "./styles"; // Importa componentes estilizados
import InputMask from "react-input-mask"; // Importa componente para máscaras de input

// Função para capitalizar o nome
const capitalizeName = (fullName) => {
  const parts = fullName.trim().split(" "); // Divide o nome em partes
  const capitalizedParts = parts.map(
    (part) => part.charAt(0).toUpperCase() + part.slice(1) // Capitaliza cada parte
  );
  return capitalizedParts.join(" "); // Junta as partes novamente
};

const EditContactPage = () => {
  const { id } = useParams(); // Pega o ID dos parâmetros da URL
  const dispatch = useDispatch(); // Hook para despachar ações
  const navigate = useNavigate(); // Hook para navegação
  const contact = useSelector((state) => selectFilteredContactById(state, id)); // Pega o contato pelo ID

  // Estados para armazenar dados do formulário e mensagens de erro
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar envio do formulário
  const [message, setMessage] = useState({ text: "", type: "" }); // Estado para mensagens de feedback

  // UseEffect para preencher o formulário quando o contato é carregado
  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
      });
    }
  }, [contact]);

  // Função para validar o nome
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

  // Função para validar o email
  const validateEmail = (value) => {
    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  // Função para validar o telefone
  const validatePhone = (value) => {
    if (!value.trim()) {
      setPhoneError("Phone is required");
    } else if (!/^\(\d{2}\)\d{5}-\d{4}$/.test(value)) {
      setPhoneError("Invalid phone format");
    } else {
      setPhoneError("");
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos do formulário
    validateName(formData.name);
    validateEmail(formData.email);
    validatePhone(formData.phone);

    // Verificação de erros de validação
    if (nameError || emailError || phoneError) {
      setIsSubmitting(false);
      return;
    }

    const capitalizedName = capitalizeName(formData.name); // Capitaliza o nome

    const contactData = {
      ...contact,
      name: capitalizedName,
      email: formData.email,
      phone: formData.phone,
    };
    setIsSubmitting(true);

    try {
      // Tenta atualizar o contato
      await dispatch(updateContact(contactData)).unwrap();
      setMessage({
        text: "Contact updated successfully!",
        type: "success",
      });
      setTimeout(() => {
        setMessage({
          text: "",
          type: "success",
        });
        navigate("/"); // Navega para a página principal após 1 segundo
      }, 1000);
    } catch (error) {
      // Lida com erros durante a atualização
      console.error("Error updating contact:", error);
      if (error.message === "Network Error") {
        setMessage({
          text: "Network Error: Unable to reach the server.",
          type: "error",
        });
      } else if (error.status === 400) {
        setMessage({
          text: "Invalid data. Please check your input and try again.",
          type: "error",
        });
      } else if (error.status === 401) {
        setMessage({
          text: "Unauthorized. Check your authentication token.",
          type: "error",
        });
      } else {
        setMessage({
          text: "Failed to update contact. Please try again later.",
          type: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para lidar com o cancelamento da edição
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <FormContainer>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              validateName(e.target.value);
            }}
            required
            disabled={isSubmitting}
          />
          <ErrorMessage>{nameError}</ErrorMessage>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              validateEmail(e.target.value);
            }}
            required
            disabled={isSubmitting}
          />
          <ErrorMessage>{emailError}</ErrorMessage>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone">Phone:</Label>
          <InputMask
            mask="(99)99999-9999"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              validatePhone(e.target.value);
            }}
            disabled={isSubmitting}
          >
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
          <ErrorMessage>{phoneError}</ErrorMessage>
        </FormGroup>
        <Message type={message.type}>{message.text}</Message>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
        <ButtonCancel
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </ButtonCancel>
      </form>
    </FormContainer>
  );
};

export default EditContactPage;
