import PropTypes from "prop-types";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfile,
  onCardLike,
  onSignOut,
}) {
  return (
    <main className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />

      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
      />
    </main>
  );
}

Profile.propTypes = {
  clothingItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      weather: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default Profile;
