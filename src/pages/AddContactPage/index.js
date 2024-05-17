import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewContact } from "../../features/slices/contactsSlice";
import { selectUser, selectAccessToken } from "../../features/slices/authSlice"; // Importe os seletores necessários
import FormContainer, { ErrorMessage } from "./styles";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

const capitalizeName = (fullName) => {
  const parts = fullName.trim().split(" ");
  const capitalizedParts = parts.map(
    (part) => part.charAt(0).toUpperCase() + part.slice(1)
  );
  return capitalizedParts.join(" ");
};

const AddContactForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userId = user.user_id; // Acessa o user_id do objeto user
  const accessToken = useSelector(selectAccessToken); // Obtém o token de acesso do estado global

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    user: userId ? userId : null,
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefoneError, setTelefoneError] = useState(""); // Corrigido para "telefoneError"
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setTelefoneError("Phone is required"); // Corrigido para "Phone is required"
    } else if (!/^\(\d{2}\)\d{5}-\d{4}$/.test(value)) {
      setTelefoneError("Invalid phone format"); // Corrigido para "Invalid phone format"
    } else {
      setTelefoneError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    validateName(formData.name);
    validateEmail(formData.email);
    validateTelefone(formData.phone); // Corrigido para "phone"

    if (!nameError && !emailError && !telefoneError) {
      const capitalizedFormData = {
        ...formData,
        name: capitalizeName(formData.name),
        user: userId,
      };

      // Adiciona o token de acesso como parte dos dados do novo contato
      const contactDataWithToken = {
        ...capitalizedFormData,
        token: accessToken,
      };

      dispatch(addNewContact(contactDataWithToken));
      setFormData({
        name: "",
        email: "",
        phone: "",
        user: userId,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSubmitting && !nameError && !emailError && !telefoneError) {
      setNameError("");
      setEmailError("");
      setTelefoneError(""); // Corrigido para "telefoneError"
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
              handleChange(e);
              validateEmail(e.target.value);
            }}
            required
            disabled={isSubmitting}
          />
          <ErrorMessage>{emailError}</ErrorMessage>
        </div>
        <div>
          <label htmlFor="phone">Phone:</label> {/* Corrigido para "phone" */}
          <InputMask
            mask="(99)99999-9999"
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              handleChange(e);
              validateTelefone(e.target.value);
            }}
            required
            disabled={isSubmitting}
          />
          <ErrorMessage>{telefoneError}</ErrorMessage>{" "}
          {/* Corrigido para "telefoneError" */}
        </div>
        <button type="submit" disabled={isSubmitting}>
          Add Contact
        </button>
      </form>
      <button className="cancel" onClick={handleCancel}>
        Cancel
      </button>
    </FormContainer>
  );
};

export default AddContactForm;
