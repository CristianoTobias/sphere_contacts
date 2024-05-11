import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectIsAuthenticated } from "../../features/slices/authSlice";


const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <nav>
        <div>
          <h1 onClick={handleHomeClick}>Contacts</h1>
        </div>
        <div>
          {isAuthenticated ? (
            <div>
              <p>{user.name}</p>
              <button onClick={handleLogout}>logout</button>
            </div>
          ) : (
            <>
              <button onClick={handleLoginClick}>Login</button>
              <button onClick={handleRegisterClick}>Register</button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
