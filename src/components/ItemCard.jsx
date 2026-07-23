import PropTypes from "prop-types";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li onClick={() => onCardClick(item)}>
      <p>{item.name}</p>
      <img src={item.link} alt={item.name} />
      <p>{item.weather}</p>
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default ItemCard;
