import PropTypes from "prop-types";
import "./ModalWithForm.css";
import { useEffect } from "react";
import closeIcon from "../../assets/images/close-icon.svg";

function ModalWithForm({
  title,
  buttonText,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
  secondaryButtonText,
  onSecondaryClick,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEsc(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose}>
          <img className="modal__close-icon" src={closeIcon} alt="Close" />
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}

          <div className="modal__actions">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>

            {secondaryButtonText && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

ModalWithForm.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  secondaryButtonText: PropTypes.string,
  onSecondaryClick: PropTypes.func,
};

export default ModalWithForm;
