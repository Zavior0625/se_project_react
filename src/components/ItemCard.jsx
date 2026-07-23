function ItemCard({ item, onCardClick }) {
  return (
    <li onClick={() => onCardClick(item)}>
      <h3>{item.name}</h3>
      <img src={item.link} alt={item.name} width="100" />
      <p>{item.weather}</p>
    </li>
  );
}

export default ItemCard;
