import { useContext } from "react";
import PropTypes from "prop-types";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar;

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        {userAvatar ? (
          <img className="sidebar__avatar" src={userAvatar} alt={userName} />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}

        <p className="sidebar__username">{userName}</p>
      </div>

      <button
        type="button"
        className="sidebar__edit-button"
        onClick={onEditProfile}
      >
        Edit Profile
      </button>

      <button
        type="button"
        className="sidebar__logout-button"
        onClick={onSignOut}
      >
        Log Out
      </button>
    </aside>
  );
}

SideBar.propTypes = {
  onEditProfile: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default SideBar;
