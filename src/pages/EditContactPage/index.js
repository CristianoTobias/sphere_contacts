import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredContactById,
  updateContact,
} from "../../features/slices/contactsSlice";

const EditContactPage = () => {
  const { id } = useParams(); // Obtém o ID do contato da URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtém os detalhes do contato com base no ID fornecido na URL
  const contact = useSelector((state) => selectFilteredContactById(state, id));

  // Estados locais para os valores dos campos de edição
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // Estados locais para os valores originais dos campos
  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalTelefone, setOriginalTelefone] = useState("");

  // Atualiza os valores dos campos quando o contato muda
  useEffect(() => {
    if (contact) {
      setName(contact.name || "");
      setEmail(contact.email || "");
      setTelefone(contact.telefone || "");

      // Salva os valores originais para o botão "Cancelar"
      setOriginalName(contact.name || "");
      setOriginalEmail(contact.email || "");
      setOriginalTelefone(contact.telefone || "");
    }
  }, [contact]);

  // Função para lidar com a submissão do formulário de edição
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Despacha a ação para atualizar o contato no Redux e no backend
      await dispatch(updateContact({ id, name, email, telefone }));
      // Redireciona para a página de detalhes do contato após a atualização
      navigate(`/`);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  // Função para lidar com o cancelamento da edição
  const handleCancel = () => {
    // Restaura os valores originais dos campos
    setName(originalName);
    setEmail(originalEmail);
    setTelefone(originalTelefone);
    // Redireciona para a página de detalhes do contato
    navigate(`/`);
  };

  // Renderiza o formulário somente quando contact estiver carregado
  if (!contact) {
    return <div>Loading...</div>;
  }

  // Renderiza o formulário com os valores iniciais dos inputs
  return (
    <div>
      <h2>Edit Contact</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            name="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditContactPage;
