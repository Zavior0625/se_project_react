import "./ModalWithForm.css";

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

        <img className="modal__image" src={card.link} alt={card.name} />

        <h2 className="modal__title">{card.name}</h2>

        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
