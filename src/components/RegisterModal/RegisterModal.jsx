import PropTypes from "prop-types";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, onRegister, onLoginClick }) {
  const { values, handleChange } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister({
      name: values.name,
      avatar: values.avatar,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryButtonText="Log In"
      onSecondaryClick={onLoginClick}
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

      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default RegisterModal;
