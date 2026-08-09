import { useState, useEffect } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";

import { defaultClothingItems } from "../utils/clothingItems";
import { getWeather, getWeatherCondition } from "../utils/weatherApi";

function App() {
  const [clothingItems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  function handleAddClick() {
    setActiveModal("add-garment");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeatherData({
          temperature: data.main.temp,
          type: getWeatherCondition(data.main.temp),
          city: data.name,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Header weatherData={weatherData} onAddClick={handleAddClick} />
      <Main
        clothingItems={clothingItems}
        weatherData={weatherData}
        onCardClick={handleCardClick}
      />
      <Footer />
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        name="add-garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
      >
        <label>
          Name
          <input type="text" />
        </label>

        <label>
          Image URL
          <input type="url" />
        </label>

        <label>
          Weather
          <input type="text" />
        </label>
      </ModalWithForm>

      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default App;
