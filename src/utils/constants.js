// Card data
export const initialCards = [
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

// Configuration object for form validation
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Element selectors
export const elements = {
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
