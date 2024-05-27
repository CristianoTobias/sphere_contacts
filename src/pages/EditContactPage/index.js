import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Importa hooks do React Router para navegação e obtenção de parâmetros da URL.
import { useDispatch, useSelector } from "react-redux"; // Importa hooks do Redux para despachar ações e selecionar partes do estado.
import {
  selectFilteredContactById,
  updateContact,
} from "../../features/slices/contactsSlice"; // Importa ação para atualizar um contato e seletor para obter um contato específico do estado.
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorMessage,
  ButtonCancel,
  Message,
} from "./styles"; // Importa estilos para a página de edição de contatos.
import InputMask from "react-input-mask"; // Componente para máscara de input.

// Função para capitalizar o nome do contato.
const capitalizeName = (fullName) => {
  return fullName
    .trim()
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const EditContactPage = () => {
  const { id } = useParams(); // Obtém o parâmetro de ID da URL.
  const dispatch = useDispatch(); // Hook para despachar ações Redux.
  const navigate = useNavigate(); // Hook para navegação programática.
  const contact = useSelector((state) => selectFilteredContactById(state, id)); // Seleciona o contato específico com base no ID da URL.

  // Estados para armazenar os dados do formulário, erros de validação, status de envio e mensagens de feedback.
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Efeito para atualizar os dados do formulário quando o contato é carregado.
  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
      });
    }
  }, [contact]);

  // Função para validar os campos do formulário.
  const validateFields = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z]{3,}/.test(formData.name)) {
      newErrors.name =
        "Name must start with a letter and have at least three letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\(\d{2}\)\d{5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para lidar com o envio do formulário.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setIsSubmitting(false);
      return;
    }

    const capitalizedName = capitalizeName(formData.name);
    const contactData = {
      ...contact,
      name: capitalizedName,
      email: formData.email,
      phone: formData.phone,
    };

    setIsSubmitting(true);

    try {
      await dispatch(updateContact(contactData)).unwrap();
      setMessage({ text: "Contact updated successfully!", type: "success" });
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 500);
      navigate("/");
    } catch (error) {
      console.error("Error updating contact:", error);
      let errorMessage = "Failed to update contact. Please try again later.";

      if (error.message === "Network Error") {
        errorMessage = "Network Error: Unable to reach the server.";
      } else if (error.status === 400) {
        errorMessage = "Invalid data. Please check your input and try again.";
      } else if (error.status === 401) {
        errorMessage = "Unauthorized. Check your authentication token.";
      }

      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para cancelar a edição e retornar à página principal.
  const handleCancel = () => {
    navigate("/"); // Navega de volta para a página principal.
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onBlur={() => validateFields()}
            required
            disabled={isSubmitting}
          />
          <ErrorMessage>{errors.name}</ErrorMessage>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onBlur={() => validateFields()}
            required
            disabled={isSubmitting}
          />
          <ErrorMessage>{errors.email}</ErrorMessage>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone">Phone:</Label>
          <InputMask
            mask="(99)99999-9999"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            onBlur={() => validateFields()}
            disabled={isSubmitting}
          >
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
          <ErrorMessage>{errors.phone}</ErrorMessage>
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
