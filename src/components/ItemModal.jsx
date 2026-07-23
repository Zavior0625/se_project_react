import PropTypes from "prop-types";
import "./ModalWithForm.css";
import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose }) {
  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose}>
          ×
        </button>

        <img src={card.link} alt={card.name} />

        <h2>{card.name}</h2>
        <p>Weather: {card.weather}</p>
      </div>
    </div>
  );
}

ItemModal.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    weather: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ItemModal;
