import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

const EditContactPage = ({ navigate }) => { // Receive navigate function as prop
  const { id } = useParams();
  const dispatch = useDispatch();

  const contact = useSelector((state) => selectFilteredContactById(state, id));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalTelefone, setOriginalTelefone] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefoneError, setTelefoneError] = useState("");

  useEffect(() => {
    if (contact) {
      setName(contact.name || "");
      setEmail(contact.email || "");
      setTelefone(contact.telefone || "");

      setOriginalName(contact.name || "");
      setOriginalEmail(contact.email || "");
      setOriginalTelefone(contact.telefone || "");
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
    validateName(capitalizedName);
    validateEmail(email);
    validateTelefone(telefone);
    if (!nameError && !emailError && !telefoneError) {
      try {
        await dispatch(
          updateContact({ id, name: capitalizedName, email, telefone })
        );
        navigate(`/`);
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    }
  };

  const handleCancel = () => {
    setName(originalName);
    setEmail(originalEmail);
    setTelefone(originalTelefone);
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
              setName(e.target.value);
              validateName(e.target.value);
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
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            required
          />
          <ErrorMessage> {emailError}</ErrorMessage>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="telefone">Telefone:</Label>
          <InputMask
            mask="(99)99999-9999"
            value={telefone}
            onChange={(e) => {
              setTelefone(e.target.value);
              validateTelefone(e.target.value);
            }}
          >
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
          <ErrorMessage> {telefoneError}</ErrorMessage>
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
