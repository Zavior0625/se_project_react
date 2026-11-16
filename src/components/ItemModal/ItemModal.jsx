import { useContext } from "react";
import PropTypes from "prop-types";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";
import closeIcon from "../../assets/images/close-icon.svg";

function ItemModal({ card, isOpen, onClose, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn =
    Boolean(currentUser?._id) &&
    String(card?.owner?._id || card?.owner) === String(currentUser._id);

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

          {isOwn && (
            <button
              type="button"
              className="modal__delete-button"
              onClick={() => onCardDelete(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

ItemModal.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    owner: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        _id: PropTypes.string,
      }),
    ]),
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
