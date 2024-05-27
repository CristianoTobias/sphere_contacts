// Esta é a página inicial da aplicação, onde são exibidos os contatos do usuário.

// Importações de bibliotecas e componentes React necessários.
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts, // Ação para buscar os contatos do usuário.
  selectAllContacts, // Seletor para obter todos os contatos.
  setContactsFilter, // Ação para definir um filtro nos contatos.
} from "../../features/slices/contactsSlice"; // Importações relacionadas aos contatos.
import PersonalContact from "../../components/PersonalView"; // Componente para exibir informações de contato pessoal.
import ContactsViews from "../../components/ContactsViews"; // Componente para exibir a lista de contatos.
import ButtonAddContact from "../../components/ButtonAddContact"; // Botão para adicionar novo contato.
import {
  HomePageContainer, // Container da página inicial.
  LeftPanel, // Painel esquerdo da página.
  RightPanel, // Painel direito da página.
  Message, // Mensagem de boas-vindas ou erro.
  ErrorMessage, // Mensagem de erro.
  BackButton, // Botão de retorno.
} from "./styles"; // Estilos específicos da página.
import { selectIsAuthenticated, logout } from "../../features/slices/authSlice"; // Seletor para verificar autenticação do usuário.

const HomePage = () => {
  const dispatch = useDispatch(); // Hook para disparar ações Redux.
  const contacts = useSelector(selectAllContacts); // Hook para obter todos os contatos do estado Redux.
  const isAuthenticated = useSelector(selectIsAuthenticated); // Hook para verificar autenticação do usuário.
  const [errMsg, setErrMsg] = useState(""); // Estado para armazenar mensagens de erro.
  const [showLeftPanel, setShowLeftPanel] = useState(true); // Estado para controlar exibição do painel esquerdo.
  const rightPanelRef = useRef(null); // Referência para o painel direito.

  // Função para buscar os contatos do usuário.
  const fetchContactsData = useCallback(async () => {
    try {
      await dispatch(fetchContacts()).unwrap(); // Dispara a ação para buscar os contatos e aguarda a conclusão.
    } catch (error) {
      console.error("Error fetching contacts:", error); // Registra erro no console.
      // Define mensagem de erro com base no tipo de erro.
      if (error.errorMessage === "Network Error") {
        setErrMsg("Network Error: Unable to reach the server.");
      } else if (error.status === 400) {
        setErrMsg("Bad request.");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized. Please log in again.");
      } else {
        setErrMsg("Failed to fetch contacts. Please try again later.");
      }
      // Aguarda 1 segundo antes de efetuar logout do usuário.
      setTimeout(() => {
        dispatch(logout());
      }, 3000);
    }
  }, [dispatch]);

  // Efeito para buscar os contatos quando o usuário está autenticado.
  useEffect(() => {
    if (isAuthenticated) {
      fetchContactsData();
    }
  }, [isAuthenticated, fetchContactsData]);

  // Função para lidar com o clique em um contato.
  const handleContactClick = (id) => {
    fetchContactsData(); // Atualiza os contatos antes de definir o filtro.
    dispatch(setContactsFilter(id)); // Define um filtro para exibir informações de um contato específico.
    // Se a tela é estreita e um contato é selecionado, oculta o painel esquerdo e rola até o painel direito.
    if (window.innerWidth <= 768 && id) {
      setShowLeftPanel(false);
      rightPanelRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Função para lidar com o clique no botão de retorno.
  const handleBackClick = () => {
    setShowLeftPanel(true); // Mostra o painel esquerdo.
    window.scrollTo({ top: 0, behavior: "smooth" }); // Rola a página para o topo suavemente.
  };

  return (
    <HomePageContainer isAuthenticated={isAuthenticated}>
      {/* Verifica se o usuário está autenticado. */}
      {!isAuthenticated ? (
        // Se não estiver autenticado, exibe mensagem de boas-vindas e instruções para login ou registro.
        <Message>
          Welcome to our website. Please login or register to access the
          content.
        </Message>
      ) : (
        // Se estiver autenticado, exibe os painéis de contatos e informações do contato selecionado (se houver).
        <>
          {/* Painel esquerdo - exibe a lista de contatos e botão para adicionar novo contato. */}
          {showLeftPanel && (
            <LeftPanel isAuthenticated={isAuthenticated}>
              {/* Verifica se há mensagem de erro. */}
              {errMsg ? (
                // Se houver mensagem de erro, exibe a mensagem de erro.
                <Message>
                  <ErrorMessage>{errMsg}</ErrorMessage>
                </Message>
              ) : (
                // Se não houver mensagem de erro, exibe a lista de contatos e botão para adicionar novo contato.
                <>
                  <ContactsViews
                    contacts={contacts}
                    handleContactClick={handleContactClick}
                  />
                  <ButtonAddContact />
                </>
              )}
            </LeftPanel>
          )}
          {/* Painel direito - exibe as informações do contato selecionado. */}
          {isAuthenticated && !errMsg && contacts.length > 0 && (
            <RightPanel isAuthenticated={isAuthenticated} ref={rightPanelRef}>
              {/* Se o painel esquerdo estiver oculto, exibe o botão de retorno. */}
              {!showLeftPanel && (
                <BackButton onClick={handleBackClick}>Back</BackButton>
              )}
              {/* Exibe o componente para visualização das informações do contato selecionado. */}
              <PersonalContact />
            </RightPanel>
          )}
        </>
      )}
    </HomePageContainer>
  );
};

export default HomePage;
