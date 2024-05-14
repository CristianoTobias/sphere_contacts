import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/Navbar";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import EditContactPage from "./pages/EditContactPage";
import AddContactPage from "./pages/AddContactPage";
import { selectIsAuthenticated } from "./features/slices/authSlice";
import { useSelector } from "react-redux";

function App() {
  return (
    <Router>
      <NavBar /> {/* Adicione o NavBar aqui */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="/contacts/add-contact"
          element={<PrivateRoute component={<AddContactPage />} />}
        />
        <Route
          path="/contacts/:id/edit"
          element={<PrivateRoute component={<EditContactPage />} />}
        />
      </Routes>
    </Router>
  );
}

// Componente de rota privada para proteger rotas que requerem autenticação
function PrivateRoute({ component, ...props }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? component : <Navigate to="/login" replace />;
}

export default App;
