import React from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Register from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import EditContactPage from "./pages/EditContactPage"; // Importe a página de edição corretamente

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login/" element={<LoginPage />} />
        <Route path="register/" element={<Register />} />
        <Route path="/contacts/:id/edit" element={<EditContactPage />} /> {/* Corrija a rota para a página de edição */}
      </Routes>
    </Router>
  );
}

export default App;
