import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  ContactsContainer,
  ContactItemContainer,
  LetterHeader,
  AlphabetBar,
  AlphabetLetter,
  ContactName,
  NoContacts,
} from "./styles";

const ContactsViews = ({ contacts, handleContactClick }) => {
  // Estados
  const [searchTerm, setSearchTerm] = useState(""); // Termo de pesquisa
  const [selectedLetter, setSelectedLetter] = useState(""); // Letra selecionada
  const [inputEnabled, setInputEnabled] = useState(true); // Estado para controlar a habilitação do input
  
  // Referências
  const contactsRef = useRef(null); // Referência para o container de contatos
  const inputRef = useRef(null); // Referência para o input de pesquisa

  // Função para lidar com a pesquisa
  const handleSearch = (term) => {
    setSearchTerm(term); // Atualiza o termo de pesquisa
    setSelectedLetter(""); // Limpa a letra selecionada
    handleContactClick(""); // Limpa a seleção de contato

    // Verifica se há contatos filtrados pela pesquisa
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().startsWith(term.toLowerCase())
    );

    // Se não houver contatos filtrados, desabilita o input temporariamente e limpa o termo de pesquisa após 2 segundos
    if (filteredContacts.length === 0) {
      setInputEnabled(false); // Desabilita o input
      setTimeout(() => {
        setSearchTerm(""); // Limpa o termo de pesquisa
        setInputEnabled(true); // Habilita o input novamente após 2 segundos
      }, 2000);
    }
  };

  // Efeito para focar no input quando ele for reabilitado
  useEffect(() => {
    if (inputEnabled && inputRef.current) {
      inputRef.current.focus(); // Foca no input
    }
  }, [inputEnabled]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const alphabetSet = new Set(
    filteredContacts.map((contact) => contact.name.charAt(0).toUpperCase())
  );

  const alphabetArray = Array.from(alphabetSet).sort();

  const scrollToLetter = (letter) => {
    const contactsContainer = contactsRef.current;
    if (contactsContainer) {
      const containerTop =
        contactsContainer.getBoundingClientRect().top + window.pageYOffset;
      const letterElement = document.getElementById(letter);
      if (letterElement) {
        const letterTop =
          letterElement.getBoundingClientRect().top +
          window.pageYOffset -
          containerTop;
        const containerScrollTop = contactsContainer.scrollTop;
        const finalScrollTop = containerScrollTop + letterTop;
        contactsContainer.scrollTop = finalScrollTop;
      }
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setSearchTerm("");
    handleContactClick("");

    // Verifica se há contatos filtrados pela letra selecionada
    const filteredByLetter = contacts.filter(
      (contact) =>
        contact.name.charAt(0).toUpperCase() === selectedLetter.toUpperCase()
    );

    // Se não houver contatos filtrados, exibe a mensagem "No contacts found" por 2 segundos
    if (filteredByLetter.length === 0) {
      setTimeout(() => {
        setSelectedLetter(""); // Limpa a letra selecionada
      }, 2000);
    }

    scrollToLetter(letter);
  };

  const filteredByLetter = contacts.filter(
    (contact) =>
      contact.name.charAt(0).toUpperCase() === selectedLetter.toUpperCase()
  );

  return (
    <ContactsContainer className="contacts-container">
      {/* Input de pesquisa */}
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        disabled={!inputEnabled} // Desabilita o input se inputEnabled for false
        ref={inputRef} // Referência para o input
      />
      {/* Mensagem "No contacts found." */}
      {contacts.length <= 0 ? (
        <NoContacts>No contacts found.</NoContacts>
      ) : (
        <>
          {searchTerm && filteredContacts.length === 0 && (
            <NoContacts>No contacts found.</NoContacts>
          )}
          {selectedLetter && filteredByLetter.length === 0 && (
            <NoContacts>No contacts found.</NoContacts>
          )}
        </>
      )}

      {/* Container de contatos */}
      {(!searchTerm || filteredContacts.length > 0) &&
        (!selectedLetter || filteredByLetter.length > 0) && (
          <ContactItemContainer ref={contactsRef}>
            {/* Renderização dos contatos */}
            {alphabetArray.map((letter) => (
              <div key={letter} id={letter}>
                <LetterHeader>{letter}</LetterHeader>
                {/* Renderização dos contatos para cada letra */}
                {filteredContacts
                  .filter(
                    (contact) => contact.name.charAt(0).toUpperCase() === letter
                  )
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => {
                        handleContactClick(contact.id);
                      }}
                    >
                      <ContactName>{contact.name}</ContactName>
                    </div>
                  ))}
              </div>
            ))}
          </ContactItemContainer>
        )}
      {/* Barra de alfabeto */}
      <AlphabetBar>
        {Array.from({ length: 26 }, (_, index) => {
          const letter = String.fromCharCode(65 + index);
          return (
            <AlphabetLetter
              key={letter}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </AlphabetLetter>
          );
        })}
      </AlphabetBar>
    </ContactsContainer>
  );
};

export default ContactsViews;
