import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../../features/slices/authSlice"; // Importe os seletores necessários
import {
  selectFilteredContactById,
  updateContact,
} from "../../features/slices/contactsSlice";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorMessage,
  ButtonCancel,
} from "./styles";
import InputMask from "react-input-mask";

const capitalizeName = (fullName) => {
  const parts = fullName.trim().split(" ");
  const capitalizedParts = parts.map(
    (part) => part.charAt(0).toUpperCase() + part.slice(1)
  );
  return capitalizedParts.join(" ");
};

const EditContactPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contact = useSelector((state) => selectFilteredContactById(state, id));
  const accessToken = useSelector(selectAccessToken); // Obtém o token de acesso do estado global

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setTelefone] = useState("");

  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPhone, setOriginalTelefone] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefoneError, setTelefoneError] = useState("");

  useEffect(() => {
    if (contact) {
      setName(contact.name || "");
      setEmail(contact.email || "");
      setTelefone(contact.phone || "");

      setOriginalName(contact.name || "");
      setOriginalEmail(contact.email || "");
      setOriginalTelefone(contact.phone || "");
    }
  }, [contact]);

  const validateName = (value) => {
    if (!value) {
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
    if (!value) {
      setEmailError("Email is required");
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validateTelefone = (value) => {
    if (!value) {
      setTelefoneError("Telefone is required");
    } else if (!/^\(\d{2}\)\d{5}-\d{4}$/.test(value)) {
      setTelefoneError("Invalid telefone format");
    } else {
      setTelefoneError("");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const capitalizedName = capitalizeName(name);

    // Adiciona o token de acesso como parte dos dados do novo contato
    const contactDataWithToken = {
      ...contact,
      name: capitalizedName,
      email: email, // Adiciona o email atualizado
      phone: phone,
      token: accessToken,
    };

    // Reset error states
    setNameError("");
    setEmailError("");
    setTelefoneError("");

    validateName(capitalizedName);
    validateEmail(email);
    validateTelefone(phone);
    console.log(contactDataWithToken)
    if (!nameError && !emailError && !telefoneError) {
      try {
        await dispatch(updateContact(contactDataWithToken));
        navigate(`/`);
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    }
  };

  const handleCancel = () => {
    setName(originalName);
    setEmail(originalEmail);
    setTelefone(originalPhone);
    navigate(`/`);
  };

  return (
    <FormContainer>
      <h2>Edit Contact</h2>
      <form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              const newName = e.target.value;
              setName(newName);
              validateName(newName);
            }}
            required
          />
          <ErrorMessage>{nameError}</ErrorMessage>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              const newEmail = e.target.value;
              setEmail(newEmail);
              validateEmail(newEmail);
            }}
            required
          />
          <ErrorMessage>{emailError}</ErrorMessage>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone">Telefone:</Label>
          <InputMask
            mask="(99)99999-9999"
            value={phone}
            onChange={(e) => {
              const newPhone = e.target.value;
              setTelefone(newPhone);
              validateTelefone(newPhone);
            }}
          >
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
          <ErrorMessage>{telefoneError}</ErrorMessage>
        </FormGroup>
        <Button type="submit">Save</Button>
        <ButtonCancel type="button" onClick={handleCancel}>
          Cancel
        </ButtonCancel>
      </form>
    </FormContainer>
  );
};

export default EditContactPage;
