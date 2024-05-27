import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectFilteredContactById,
  selectContactsFilter,
  removeContact,
  fetchContacts,
} from "../../features/slices/contactsSlice";
import {
  PersonalContactContainer,
  ContactHeader,
  InitialsCircle,
  ContactName,
  ContactInfo,
  Email,
  Phone,
  ButtonContainer,
  Button,
  Message,
  ButtonDelete,
  MessageError,
} from "./styles";

const PersonalContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(selectContactsFilter);
  const filteredContact = useSelector((state) => selectFilteredContactById(state, id));

  const [circleColors, setCircleColors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteContact = async (contactId) => {
    try {
      await dispatch(removeContact(contactId)).unwrap();
      setErrorMessage("");
      dispatch(fetchContacts());
    } catch (error) {
      if (error.message === "Network Error") {
        setErrorMessage("Network Error: Unable to reach the server.");
      } else if (error.status === 400) {
        setErrorMessage("Bad request.");
      } else if (error.status === 401) {
        setErrorMessage("Unauthorized. Check your authentication token.");
      } else {
        setErrorMessage("Failed to delete contact. Please try again later.");
      }
    }
  };

  const handleEditContact = (contactId) => {
    navigate(`/contacts/${contactId}/edit`);
  };

  const getInitials = (name) => {
    const nameArray = name.split(" ");
    const initials =
      nameArray.length > 1
        ? nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0)
        : nameArray[0].charAt(0);
    return initials.toUpperCase();
  };

  const getRandomColor = () => {
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getColorForContact = (contactId) => {
    if (!circleColors[contactId]) {
      const color = getRandomColor();
      setCircleColors((prevColors) => ({
        ...prevColors,
        [contactId]: color,
      }));
      return color;
    } else {
      return circleColors[contactId];
    }
  };

  return (
    <PersonalContactContainer>
      {filteredContact ? (
        <div>
          <ContactHeader>
            <InitialsCircle color={getColorForContact(filteredContact.id)}>
              {getInitials(filteredContact.name)}
            </InitialsCircle>
          </ContactHeader>
          <ContactInfo>
            <ContactName>{filteredContact.name}</ContactName>
            <Email>Email: {filteredContact.email}</Email>
            <Phone>
              Phone: <span>{filteredContact.phone}</span>
            </Phone>
          </ContactInfo>
          <ButtonContainer>
            <Button onClick={() => handleEditContact(filteredContact.id)}>
              Edit
            </Button>
            <ButtonDelete onClick={() => handleDeleteContact(filteredContact.id)}>
              Delete
            </ButtonDelete>
          </ButtonContainer>
        </div>
      ) : (
        <Message>No contact selected.</Message>
      )}
      {errorMessage && <MessageError>{errorMessage}</MessageError>}
    </PersonalContactContainer>
  );
};

export default PersonalContact;
