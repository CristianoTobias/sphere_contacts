import React from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login/" element={<Login />} />
        <Route path="register/" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
