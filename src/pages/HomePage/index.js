import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts, // Ação para buscar contatos
  selectAllContacts, // Selector para obter todos os contatos
  setContactsFilter, // Ação para definir o filtro de contatos
} from "../../features/slices/contactsSlice";
import PersonalContact from "../../components/PersonalView"; // Componente para exibição do contato pessoal
import ContactsViews from "../../components/ContactsViews"; // Componente para exibição da lista de contatos
import ButtonAddContact from "../../components/ButtonAddContact"; // Componente para adicionar novo contato
import {
  HomePageContainer,
  LeftPanel,
  RightPanel,
  Message,
  ErrorMessage,
  BackButton,
} from "./styles"; // Importação de componentes estilizados
import { selectIsAuthenticated, logout } from "../../features/slices/authSlice"; // Selector para verificar autenticação e ação para logout

const HomePage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts); // Obtém todos os contatos do estado
  const isAuthenticated = useSelector(selectIsAuthenticated); // Verifica se o usuário está autenticado
  const [errMsg, setErrMsg] = useState(""); // Estado para mensagem de erro
  const [showLeftPanel, setShowLeftPanel] = useState(true); // Estado para controlar a exibição do painel esquerdo
  const rightPanelRef = useRef(null); // Referência para o painel direito

  // Hook de efeito para buscar contatos quando o componente é montado
  useEffect(() => {
    if (isAuthenticated) {
      const fetchContactsData = async () => {
        try {
          await dispatch(fetchContacts()).unwrap(); // Busca os contatos e "desembrulha" a resposta da thunk
        } catch (error) {
          console.error("Error fetching contacts:", error);
          if (error.errorMessage === "Network Error") {
            setErrMsg("Network Error: Unable to reach the server.");
          } else if (error.status === 400) {
            setErrMsg("Bad request.");
          } else if (error.status === 401) {
            setErrMsg("Unauthorized. Please log in again.");
          } else {
            setErrMsg("Failed to fetch contacts. Please try again later.");
          }
          setTimeout(() => {
            dispatch(logout()); // Faz logout após 5 segundos em caso de erro
          }, 5000);
        }
      };

      fetchContactsData(); // Chama a função para buscar contatos
    }
  }, [dispatch, isAuthenticated]);

  // Função para tratar o clique em um contato
  const handleContactClick = (id) => {
    dispatch(setContactsFilter(id)); // Define o filtro de contatos
    if (window.innerWidth <= 768 && id) { // Verifica se um contato foi clicado e a largura da janela
      setShowLeftPanel(false); // Esconde o painel esquerdo
      rightPanelRef.current.scrollIntoView({ behavior: "smooth" }); // Rola a tela suavemente para o painel direito
    }
  };

  // Função para tratar o clique no botão "Back"
  const handleBackClick = () => {
    setShowLeftPanel(true); // Mostra o painel esquerdo
    window.scrollTo({ top: 0, behavior: "smooth" }); // Rola a tela para o topo suavemente
  };

  return (
    <HomePageContainer isAuthenticated={isAuthenticated}>
      {!isAuthenticated ? ( // Verifica se o usuário não está autenticado
        <Message>
          Welcome to our website. Please login or register to access the
          content.
        </Message>
      ) : (
        <>
          {showLeftPanel && ( // Mostra o painel esquerdo se `showLeftPanel` for verdadeiro
            <LeftPanel isAuthenticated={isAuthenticated}>
              {errMsg ? (
                <Message>
                  <ErrorMessage>{errMsg}</ErrorMessage> {/* Exibe a mensagem de erro */}
                </Message>
              ) : (
                <>
                  <ContactsViews
                    contacts={contacts}
                    handleContactClick={handleContactClick} // Passa a função de clique no contato para o componente
                  />
                  <ButtonAddContact /> {/* Botão para adicionar contato */}
                </>
              )}
            </LeftPanel>
          )}
          {isAuthenticated && !errMsg && contacts.length > 0 && ( // Verifica se o usuário está autenticado, não há erro e há contatos
            <RightPanel isAuthenticated={isAuthenticated} ref={rightPanelRef}>
              {!showLeftPanel && ( // Mostra o botão "Back" se o painel esquerdo não estiver visível
                <BackButton onClick={handleBackClick}>Back</BackButton>
              )}
              <PersonalContact /> {/* Componente para exibição do contato pessoal */}
            </RightPanel>
          )}
        </>
      )}
    </HomePageContainer>
  );
};

export default HomePage;
