import React, { useState, useRef } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const contactsRef = useRef(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedLetter("");
    handleContactClick("");
  };

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
    scrollToLetter(letter);
  };

  const filteredByLetter = contacts.filter(
    (contact) =>
      contact.name.charAt(0).toUpperCase() === selectedLetter.toUpperCase()
  );

  return (
    <ContactsContainer className="contacts-container">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {(searchTerm || filteredContacts.length === 0) && (
        <NoContacts>No contacts found.</NoContacts>
      )}
      {selectedLetter && <NoContacts>No contacts found.</NoContacts>}

      {(!searchTerm || filteredContacts.length > 0) &&
        (!selectedLetter || filteredByLetter.length > 0) && (
          <ContactItemContainer ref={contactsRef}>
            {alphabetArray.map((letter) => (
              <div key={letter} id={letter}>
                <LetterHeader>{letter}</LetterHeader>
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
