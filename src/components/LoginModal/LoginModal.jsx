import PropTypes from "prop-types";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onLogin, onRegisterClick }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();

    onLogin({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryButtonText="Sign Up"
      onSecondaryClick={onRegisterClick}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
};

export default LoginModal;
