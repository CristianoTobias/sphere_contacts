// Em PersonalContact.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectFilteredContactById,
  selectContactsFilter,
  removeContact,
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
} from "./styles";

const PersonalContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(selectContactsFilter);
  const filteredContact = useSelector((state) => {
    return selectFilteredContactById(state, id);
  });

  const [circleColors, setCircleColors] = useState({});

  const handleDeleteContact = (contactId) => {
    dispatch(removeContact(contactId));
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

  function getRandomColor() {
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

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
              Phone: <span> {filteredContact.phone}</span>
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
    </PersonalContactContainer>
  );
};

export default PersonalContact;
