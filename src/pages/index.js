import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "aab398bd-53ed-43f4-a142-4dc87cb0dd79",
    "Content-Type": "application/json",
  },
});

// Initialize UserInfo with correct selectors
const userInformation = new UserInfo({
  name: ".profile__header",
  description: ".profile__description",
});

// Get header elements for name, about, and avatar
const profileName = document.querySelector(".profile__header");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

let cardSection;

api
  .getUserInfo()
  .then((res) => {
    // Set user info to UserInfo instance
    userInformation.setUserInfo({
      title: res.name,
      description: res.about,
    });

    // Update header elements with user info
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    profileAvatar.src = res.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getInitialCards()
  .then((res) => {
    cardSection = new Section(
      { items: res, renderer: renderCard },
      ".cards__gallery"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

function renderCard(cardData) {
  const card = new Card(
    cardData,
    selectors.cardTemplate,
    openPreviewModal,
    handleCardDeleteClick,
    handleLikeClick
  ).getCardElement();
  cardSection.addItem(card);
}

const cardPreview = new PopupWithImage("#image-popup");
cardPreview.setEventListeners();

// Initialize form validators
const profileEditValidator = new FormValidator(
  constants.config,
  constants.profileEditForm
);
const addCardValidator = new FormValidator(
  constants.config,
  constants.addCardModal
);

profileEditValidator.enableValidation();
addCardValidator.enableValidation();

function handleImageClick(name, link) {
  cardPreview.open({ name, link });
}

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
}

const profileEditForm = new PopupWithForm("#profile-edit-popup", (data) => {
  const { header, description } = data;
  api
    .updateUserInfo(header, description)
    .then((res) => {
      userInformation.setUserInfo({
        title: res.name,
        description: res.about,
      });
      profileEditForm.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    });
});

profileEditForm.setEventListeners();

constants.profileEditButton.addEventListener("click", () => {
  profileEditValidator.resetValidation();
  const userData = userInformation.getUserInfo();
  constants.profileTitleInput.value = userData.title; // Adjusted to match API response
  constants.profileDescriptionInput.value = userData.description.trim(); // Adjusted to match API response
  profileEditForm.open();
});

const addCardForm = new PopupWithForm("#add-card-popup", (data) => {
  const { title, URL } = data;
  api
    .addCard(title, URL)
    .then((cardData) => {
      cardSection.addItem(createCard(cardData));
      addCardForm.close();
    })
    .catch((err) => {
      console.error("Error adding card:", err);
    });
  addCardValidator.disableButton();
});
addCardForm.setEventListeners();

constants.addCardButton.addEventListener("click", () => {
  addCardForm.open();
});
