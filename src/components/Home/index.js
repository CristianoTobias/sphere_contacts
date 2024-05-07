import { useEffect } from "react";
import {
  fectchContacts,
  getContatcsError,
  getContatcsStatus,
  selectAllContacts,
} from "../../features/contatcsSice/contactsSlice";
import ContactsList from "../ContactsList";
import PersonalContact from "../PersoanlContact";
import SidePanel from "../SidePanel";
import { useDispatch, useSelector } from "react-redux";
import ContactExcerpt from "../../features/contatcsSice/contactsExcerpt";

const Home = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);
  const contatcsStatus = useSelector(getContatcsStatus);
  const errors = useSelector(getContatcsError);

  useEffect(() => {
    if (contatcsStatus === "idle") {
      dispatch(fectchContacts());
    }
  }, [dispatch, contatcsStatus]);
 
  let content;
  if (contatcsStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (contatcsStatus === "succeeded") {
    
    content = contacts.map((contact) => (
      <ContactExcerpt
        key={contact.id}
        contactId={contact.id}
        contactName={contact.name}
        contactEmail={contact.email}
        contactPhone={contact.phone}
      />
    ));
    
  } else if (contatcsStatus === "failed") {
    content = <p>Failed {errors} </p>;
  }

  return (
    <div>
      <div>{content}</div>
      <ContactsList />
      <PersonalContact />
      <SidePanel />
    </div>
  );
};

export default Home;
