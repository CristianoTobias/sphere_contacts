import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  getContactsError,
  getContactsStatus,
  selectAllContacts,
  setContactsFilter,
} from "../../features/slices/contactsSlice";
import PersonalContact from "../../components/PersonalView";
import ContactsViews from "../../components/ContactsViews";
import ButtonAddContact from "../../components/ButtonAddContact";
import { HomePageContainer, LeftPanel, RightPanel, Message } from "./styles"; // Importe o componente Message
import GlobalStyles from "../../GlobalStyles";
import { selectIsAuthenticated } from "../../features/slices/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);
  const contactsStatus = useSelector(getContactsStatus);
  const errors = useSelector(getContactsError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (contactsStatus === "idle") {
      dispatch(fetchContacts());
    }
  }, [dispatch, contactsStatus]);

  let content;
  if (!isAuthenticated) {
    // Renderiza a mensagem se nenhum usuário estiver autenticado
    content = (
      <Message>
        Welcome to our website. Please login or register to access the content.
      </Message>
    );
  } else if (contactsStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (contactsStatus === "succeeded") {
    content = (
      <ContactsViews
        contacts={contacts}
        handleContactClick={(id) => dispatch(setContactsFilter(id))}
      />
    );
  } else if (contactsStatus === "failed") {
    content = <Message>Failed to load contacts: {errors}</Message>;
  }

  return (
    <>
      <GlobalStyles />
      <HomePageContainer>
        {/* Renderiza o botão de adicionar contato apenas se o usuário estiver autenticado */}
        <LeftPanel isAuthenticated={isAuthenticated}>
          <div>{content}</div>
          {isAuthenticated && <ButtonAddContact />}
        </LeftPanel>
        {/* Renderiza o RightPanel apenas se o usuário estiver autenticado */}
        <RightPanel isAuthenticated={isAuthenticated}>
          {isAuthenticated && <PersonalContact />}
        </RightPanel>
      </HomePageContainer>
    </>
  );
};

export default HomePage;
