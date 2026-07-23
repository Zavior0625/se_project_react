import PropTypes from "prop-types";
import "./Header.css";

function Header({ onAddClick }) {
  return (
    <header>
      <button type="button" onClick={onAddClick}>
        + Add Clothes
      </button>
    </header>
  );
}

Header.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};

export default Header;
