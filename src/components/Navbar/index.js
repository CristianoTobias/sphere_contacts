import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div>
      <nav>
        <div>
          <h1 onClick={handleHomeClick}>Contacts</h1>
        </div>
        <div>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleRegisterClick}>Register</button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
