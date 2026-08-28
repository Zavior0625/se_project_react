import PropTypes from "prop-types";
import "./ItemModal.css";
import closeIcon from "../../assets/images/close-icon.svg";

function ItemModal({ card, isOpen, onClose, onCardDelete }) {
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

        <img
          className="modal__image"
          src={card.imageUrl || card.link}
          alt={card.name}
        />

        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          <button
            type="button"
            className="modal__delete-button"
            onClick={() => onCardDelete(card)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

ItemModal.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    link: PropTypes.string,
    imageUrl: PropTypes.string,
    weather: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
};

export default ItemModal;
