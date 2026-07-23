import "./Header.css";
function Header({ weatherData, onAddClick }) {
  return (
    <header>
      <button type="button" onClick={onAddClick}>
        + Add Clothes
      </button>
    </header>
  );
}

export default Header;
