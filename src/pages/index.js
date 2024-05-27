import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

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

const userInformation = new UserInfo({
  name: ".profile__header",
  description: ".profile__description",
});

const profileEditForm = new PopupWithForm("#profile-edit-popup", (data) => {
  userInformation.setUserInfo({
    title: data.header,
    description: data.description,
  });
});
profileEditForm.setEventListeners();

constants.profileEditButton.addEventListener("click", () => {
  profileEditValidator.resetValidation();
  const userData = userInformation.getUserInfo();
  constants.profileTitleInput.value = userData.title;
  constants.profileDescriptionInput.value = userData.description.trim();
  profileEditForm.open();
});

const addCardForm = new PopupWithForm("#add-card-popup", (data) => {
  cardSection.addItem(createCard({ name: data.title, link: data.URL }));
  addCardValidator.disableButton();
});
addCardForm.setEventListeners();

constants.addCardButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  addCardForm.open();
});

const cardSection = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  constants.cardListEl
);

cardSection.renderItems(constants.initialCards);
