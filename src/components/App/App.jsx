import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { register, authorize, checkToken } from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  likeItem,
  dislikeItem,
} from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { getWeather, getWeatherCondition } from "../../utils/weatherApi";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  function handleAddItem(item, resetForm) {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        resetForm();
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleRegister({ name, avatar, email, password }) {
    register({ name, avatar, email, password })
      .then(() => {
        return authorize({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  }

  function handleLogin({ email, password }) {
    authorize({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveModal("");
  }

  function handleRegisterClick() {
    setActiveModal("register");
  }

  function handleLoginClick() {
    setActiveModal("login");
  }

  function handleEditProfileClick() {
    console.log("Edit Profile button clicked!");
    setActiveModal("edit-profile");
  }

  function handleUpdateUser({ name, avatar }) {
    updateUser({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  }

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

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  function handleCardDelete(card) {
    deleteItem(card._id)
      .then(() => {
        const newItems = clothingItems.filter((item) => item._id !== card._id);

        setClothingItems(newItems);
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id.toString() === currentUser._id);

    const request = isLiked ? dislikeItem(card._id) : likeItem(card._id);

    request
      .then((updatedItem) => {
        setClothingItems((items) =>
          items.map((item) =>
            item._id === updatedItem._id ? updatedItem : item,
          ),
        );
      })
      .catch((err) => console.error("Error updating like:", err));
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsAuthChecking(false);
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token verification failed:", err);
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsAuthChecking(false);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        getWeather(coordinates)
          .then((data) => {
            setWeatherData({
              temperature: {
                F: data.main.temp,
                C: Math.round(((data.main.temp - 32) * 5) / 9),
              },
              type: getWeatherCondition(data.main.temp),
              city: data.name,
            });
          })
          .catch(console.error);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      },
    );
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__container">
            <Header
              weatherData={weatherData}
              onAddClick={handleAddClick}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isAuthChecking={isAuthChecking}
                  >
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddClick={handleAddClick}
                      onEditProfile={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLogin}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseModal}
            onUpdateUser={handleUpdateUser}
            currentUser={currentUser}
          />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItem}
            onClose={handleCloseModal}
          />

          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "preview"}
            onClose={handleCloseModal}
            onCardDelete={handleCardDelete}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
