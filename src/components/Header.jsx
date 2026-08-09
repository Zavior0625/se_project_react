import PropTypes from "prop-types";
import "./Header.css";
import logo from "../assets/images/Logo.svg";
import avatar from "../assets/images/avatar.svg";

function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" src={logo} alt="WTWR logo" />

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city || "Loading..."}
        </p>
      </div>

      <div className="header__right">
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={onAddClick}
        >
          + Add clothes
        </button>

        <p className="header__username">Auzam Awan</p>

        <img className="header__avatar" src={avatar} alt="Auzam Awan" />
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
