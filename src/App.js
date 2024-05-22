import React from "react";
import {
  BrowserRouter as Router, // Alias para BrowserRouter renomeado como Router
  Routes, // Componente para definir rotas
  Route, // Componente para definir uma rota específica
  Navigate, // Componente para navegar para uma rota específica
} from "react-router-dom"; // Importações relacionadas ao roteamento
import NavBar from "./components/Navbar"; // Componente de barra de navegação
import LoginPage from "./pages/loginPage"; // Página de login
import RegisterPage from "./pages/RegisterPage"; // Página de registro
import HomePage from "./pages/HomePage"; // Página inicial
import EditContactPage from "./pages/EditContactPage"; // Página de edição de contato
import AddContactPage from "./pages/AddContactPage"; // Página de adição de contato
import { selectIsAuthenticated } from "./features/slices/authSlice"; // Seletor para verificar se o usuário está autenticado
import { useSelector } from "react-redux"; // Hook para acessar o estado do Redux
import GlobalStyles from './GlobalStyles' // Estilos globais

function App() {
  return (
    <Router> {/* Componente Router para envolver toda a aplicação com capacidade de roteamento */}
      <GlobalStyles /> {/* Estilos globais da aplicação */}
      <NavBar /> {/* Barra de navegação */}
      <Routes> {/* Componente Routes para definir as rotas da aplicação */}
        <Route path="/" element={<HomePage />} /> {/* Rota para a página inicial */}
        <Route path="login" element={<LoginPage />} /> {/* Rota para a página de login */}
        <Route path="register" element={<RegisterPage />} /> {/* Rota para a página de registro */}
        {/* Rota protegida para adicionar um novo contato, acessível apenas se o usuário estiver autenticado */}
        <Route
          path="/contacts/add-contact"
          element={<PrivateRoute component={<AddContactPage />} />}
        />
        {/* Rota protegida para editar um contato existente, acessível apenas se o usuário estiver autenticado */}
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
  const isAuthenticated = useSelector(selectIsAuthenticated); // Verifica se o usuário está autenticado

  return isAuthenticated ? component : <Navigate to="/login" replace />; // Se autenticado, renderiza o componente; caso contrário, redireciona para a página de login
}

export default App; // Exporta o componente principal da aplicação
