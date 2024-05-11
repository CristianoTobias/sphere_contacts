import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectFilteredContactById,
  selectContactsFilter,
  removeContact,
} from "../../features/slices/contactsSlice";

const PersonalContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(selectContactsFilter);
  // Seleciona os contatos filtrados pelo ID especificado no filtro
  const filteredContact = useSelector((state) => {
    return selectFilteredContactById(state, id);
  });

  const handleDeleteContact = (contactId) => {
    dispatch(removeContact(contactId));
  };

  const handleEditContact = (contactId) => {
    navigate(`/contacts/${contactId}/edit`);
  };

  return (
    <div>
      <h2>Personal Contacts</h2>
      {filteredContact && (
        <ul>
          <li key={filteredContact.id}>
            <p>Nome: {filteredContact.name}</p>
            <p>Email: {filteredContact.email}</p>
            <p>Telefone: {filteredContact.telefone}</p>
            <button onClick={() => handleDeleteContact(filteredContact.id)}>
              Excluir
            </button>
            <button onClick={() => handleEditContact(filteredContact.id)}>
              Editar
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default PersonalContact;
