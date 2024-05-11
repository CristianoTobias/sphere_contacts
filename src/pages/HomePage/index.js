// Criando a página HomePage
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, getContactsError, getContactsStatus, selectAllContacts } from "../../features/slices/contactsSlice";
import PersonalContact from "../../components/PersonalView";
import SidePanel from "../../components/SidePanel";
import AddContactForm from "../../components/addContact";
import ContactsViews from "../../components/ContactsViews";


const HomePage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);
  const contactsStatus = useSelector(getContactsStatus);
  const errors = useSelector(getContactsError);

  useEffect(() => {
    if (contactsStatus === "idle") {
      dispatch(fetchContacts());
    }
  }, [dispatch, contactsStatus]);

  let content;
  if (contactsStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (contactsStatus === "succeeded") {
    content = contacts.map((contact) => (
      <ContactsViews key={contact.id} contact={contact} />
    ));
  } else if (contactsStatus === "failed") {
    content = <p>Failed {errors} </p>;
  }

  return (
    <div>
      <div>{content}</div>
      <AddContactForm />
      <PersonalContact />
      <SidePanel />
    </div>
  );
};

export default HomePage;
