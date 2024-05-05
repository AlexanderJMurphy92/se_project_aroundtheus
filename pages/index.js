import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// Card data
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago Di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

// Constants
const elements = {
  imagePopupCloseButton: document.querySelector("#image-popup .popup__close"),
  profileEditButton: document.querySelector("#profile-edit-button"),
  profileEditPopup: document.querySelector("#profile-edit-popup"),
  addCardPopup: document.querySelector("#add-card-popup"),
  profileEditCloseButton: document.querySelector(
    "#profile-edit-popup .popup__close"
  ),
  addCardCloseButton: document.querySelector("#add-card-popup .popup__close"),
  addNewCardButton: document.querySelector(".profile__add-button"),
  profileName: document.querySelector(".profile__header"),
  profileDescription: document.querySelector(".profile__description"),
  cardTitleInput: document.querySelector(".popup__input_type_title"),
  cardUrlInput: document.querySelector(".popup__input_type_url"),
  profileTitleInput: document.querySelector("#profile-title-input"),
  profileDescriptionInput: document.querySelector("#profile-description-input"),
  profileEditForm: document.querySelector("#profile-edit-popup .popup__form"),
  addCardFormElement: document.querySelector("#add-card-popup .popup__form"),
  cardListEl: document.querySelector(".cards__list"),
  cardTemplate: document
    .querySelector("#card-template")
    .content.querySelector(".card"),
  imagePopup: document.querySelector("#image-popup"),
  popupImage: document.querySelector("#image-popup .popup__image"),
  popupTitle: document.querySelector("#image-popup .popup__caption"),
};

// Usage
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Global instances of form validators
const profileFormValidator = new FormValidator(
  config,
  elements.profileEditForm
);
const cardFormValidator = new FormValidator(
  config,
  elements.addCardFormElement
);

// Enable validation for each form
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Event listeners
elements.profileEditButton.addEventListener("click", () => {
  elements.profileTitleInput.value = elements.profileName.textContent;
  elements.profileDescriptionInput.value =
    elements.profileDescription.textContent;
  openPopup(elements.profileEditPopup);
});

elements.profileEditForm.addEventListener("submit", handleProfileEditSubmit);
elements.addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
elements.addNewCardButton.addEventListener("click", () => {
  cardFormValidator.resetValidation(); // Reset validation state and toggle button state
  openPopup(elements.addCardPopup);
});

// Initial rendering of cards
initialCards.forEach((cardData) => renderCard(cardData, elements.cardListEl));

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", handlePopupClick);
  document.removeEventListener("keydown", handleEscKeyPress);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", handlePopupClick);
  document.addEventListener("keydown", handleEscKeyPress);
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", (name, link) => {
    elements.popupImage.src = link;
    elements.popupImage.alt = name;
    elements.popupTitle.textContent = name;
    openPopup(elements.imagePopup);
  });
  const cardElement = card.getView();
  wrapper.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  elements.profileName.textContent = elements.profileTitleInput.value;
  elements.profileDescription.textContent =
    elements.profileDescriptionInput.value;
  closePopup(elements.profileEditPopup);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = elements.cardTitleInput.value;
  const link = elements.cardUrlInput.value;
  renderCard({ name, link }, elements.cardListEl);
  e.target.reset();
  closePopup(elements.addCardPopup);
}

function handlePopupClick(evt) {
  const popup = evt.currentTarget;
  if (
    evt.target.classList.contains("popup_opened") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(popup);
  }
}

function handleEscKeyPress(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
