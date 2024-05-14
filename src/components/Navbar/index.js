// Navbar.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout, selectIsAuthenticated } from "../../features/slices/authSlice";
import {
  NavContainer,
  Logo,
  UserInfo,
  UserName,
  ButtonContainer,
  LogoutButton,
  AuthButton,
} from "./styles"; // Importação corrigida para o arquivo de estilos

const NavBar = () => {
  const [showButtons, setShowButtons] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  useEffect(() => {
    // Verifica se o usuário está na página de login ou de registro
    setShowButtons(location.pathname !== "/login" && location.pathname !== "/register");
  }, [location.pathname]); // Atualiza quando a localização da página mudar

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <NavContainer>
      <Logo> My Contacts</Logo>
      <UserInfo>
        {isAuthenticated ? (
          <>
            <UserName>{user.name}</UserName> {/* Exibe o nome do usuário */}
            <ButtonContainer className={showButtons ? "show" : "hide"}>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </ButtonContainer>
          </>
        ) : (
          <ButtonContainer className={showButtons ? "show" : "hide"}>
            {showButtons && (
              <>
                <AuthButton onClick={handleLoginClick}>Login</AuthButton>
                <AuthButton onClick={handleRegisterClick}>Register</AuthButton>
              </>
            )}
          </ButtonContainer>
        )}
      </UserInfo>
    </NavContainer>
  );
};

export default NavBar;
