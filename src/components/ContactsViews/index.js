import React, { useState } from "react";
import {
  Input,
  ContactsContainer,
  ContactItemContainer,
  LetterHeader,
  AlphabetBar,
  AlphabetLetter,
  ContactName,
} from "./styles";

const ContactsViews = ({ contacts, handleContactClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
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
    const letterElement = document.getElementById(letter);
    if (letterElement) {
      letterElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleLetterClick = () => {
    setSearchTerm("");
    handleContactClick("");
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <ContactsContainer className="contacts-container">
        <ContactItemContainer>
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
        <AlphabetBar>
          {Array.from({ length: 26 }, (_, index) => {
            const letter = String.fromCharCode(65 + index);
            return (
              <AlphabetLetter
                key={letter}
                onClick={() => {
                  handleLetterClick();
                  scrollToLetter(letter);
                }}
              >
                {letter}
              </AlphabetLetter>
            );
          })}
        </AlphabetBar>
      </ContactsContainer>
    </>
  );
};

export default ContactsViews;
