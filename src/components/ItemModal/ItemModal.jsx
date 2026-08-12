import PropTypes from "prop-types";
import "./ItemModal.css";
import closeIcon from "../../assets/images/close-icon.svg";
function ItemModal({ card, isOpen, onClose }) {
  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose}>
          <img className="modal__close-icon" src={closeIcon} alt="Close" />
        </button>

        <img className="modal__image" src={card.link} alt={card.name} />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>

          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
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
