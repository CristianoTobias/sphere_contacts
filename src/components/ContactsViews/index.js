import React from "react";
import { useDispatch } from "react-redux";
import { setContactsFilter } from "../../features/slices/contactsSlice";

const ContactsViews = ({ contact }) => {
  const dispatch = useDispatch();

  const handleContactClick = () => {
    // Quando clicar em um contato, define o filtro para o ID do contato clicado
    dispatch(setContactsFilter(contact.id));
  };

  return (
    <div onClick={handleContactClick}>
      <p>{contact.name}</p>
    </div>
  );
};

export default ContactsViews;