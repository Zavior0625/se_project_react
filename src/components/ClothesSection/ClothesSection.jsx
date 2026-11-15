import { useContext } from "react";
import PropTypes from "prop-types";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id,
  );

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>

        <button
          type="button"
          className="clothes-section__add-button"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__items">
        {userClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </section>
  );
}

ClothesSection.propTypes = {
  clothingItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      weather: PropTypes.string.isRequired,
      owner: PropTypes.string,
    }),
  ).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
};

export default ClothesSection;
