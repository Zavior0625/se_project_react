import PropTypes from "prop-types";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ clothingItems, onCardClick, onAddClick }) {
  return (
    <main className="profile">
      <SideBar />

      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
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
};

export default Profile;
