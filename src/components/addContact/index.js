import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewContact } from "../../features/slices/contactsSlice";

const AddContactForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.telefone.trim()) {
      dispatch(addNewContact(formData));
      setFormData({
        name: "",
        email: "",
        telefone: "",
      });
    }
  };

  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="telefone">Phone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default AddContactForm;
