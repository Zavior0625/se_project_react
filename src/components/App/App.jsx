import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

import { defaultClothingItems } from "../../utils/clothingItems";
import { getWeather, getWeatherCondition } from "../../utils/weatherApi";

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
    <div className="app">
      <div className="page__container">
        <Header weatherData={weatherData} onAddClick={handleAddClick} />

        <Main
          clothingItems={clothingItems}
          weatherData={weatherData}
          onCardClick={handleCardClick}
        />

        <Footer />
      </div>

      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        name="add-garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
      >
        <label className="modal__label">
          Name
          <input
            className="modal__input"
            type="text"
            name="name"
            placeholder="Name"
          />
        </label>

        <label className="modal__label">
          Image URL
          <input
            className="modal__input"
            type="url"
            name="link"
            placeholder="Image URL"
          />
        </label>

        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>

          <label className="modal__radio-label">
            <input
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="hot"
            />
            Hot
          </label>

          <label className="modal__radio-label">
            <input
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="warm"
            />
            Warm
          </label>

          <label className="modal__radio-label">
            <input
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="cold"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
