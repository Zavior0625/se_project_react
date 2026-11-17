import { useContext } from "react";
import PropTypes from "prop-types";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heartOutline from "../../assets/images/heart-outline.svg";
import heartFilled from "../../assets/images/heart-filled.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id.toString() === currentUser?._id);

  function handleLikeClick(e) {
    e.stopPropagation();
    onCardLike(item);
  }

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <div className="card__header">
        <p className="card__name">{item.name}</p>

        {currentUser && (
          <button
            type="button"
            className="card__like-button"
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike item" : "Like item"}
          >
            <img
              src={isLiked ? heartFilled : heartOutline}
              alt=""
              className="card__like-icon"
            />
          </button>
        )}
      </div>

      <img className="card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
};

export default ItemCard;
