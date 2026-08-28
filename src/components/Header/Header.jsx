import PropTypes from "prop-types";
import "./Header.css";
import logo from "../../assets/images/Logo.svg";
import avatar from "../../assets/images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

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

        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={onAddClick}
        >
          + Add clothes
        </button>

        <Link to="/profile" className="header__profile-link">
          <Link to="/profile" className="header__profile-link">
            <p className="header__username">Auzam Awan</p>
            <img className="header__avatar" src={avatar} alt="Auzam Awan" />
          </Link>
        </Link>
      </div>
    </header>
  );
}

Header.propTypes = {
  weatherData: PropTypes.shape({
    city: PropTypes.string,
  }).isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default Header;
