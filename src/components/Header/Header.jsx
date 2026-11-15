import PropTypes from "prop-types";
import "./Header.css";
import logo from "../../assets/images/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  weatherData,
  onAddClick,
  onLoginClick,
  onRegisterClick,
  isLoggedIn,
  currentUser,
}) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar;

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city || "Loading..."}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__add-clothes-btn"
              onClick={onAddClick}
            >
              + Add clothes
            </button>

            <Link to="/profile" className="header__profile-link">
              <p className="header__username">{userName}</p>

              {userAvatar ? (
                <img
                  className="header__avatar"
                  src={userAvatar}
                  alt={userName}
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__auth-btn"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>

            <button
              type="button"
              className="header__auth-btn"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  weatherData: PropTypes.shape({
    city: PropTypes.string,
  }).isRequired,
  onAddClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

export default Header;
