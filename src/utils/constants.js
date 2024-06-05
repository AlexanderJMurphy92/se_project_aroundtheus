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

export const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

// Configuration object for form validation
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const profileEditPopup = document.querySelector("#profile-edit-popup");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileName = document.querySelector(".profile__header");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const avatarEditButton = document.querySelector(
  ".profile__avatar-button"
);
export const avatarEditPopup = document.querySelector("#edit-avatar-popup");
export const avatarUpdateForm = document.querySelector("#avatar-form");
export const avatarCloseButton =
  avatarUpdateForm.querySelector(".popup__close");
export const avatarLinkInput = document.querySelector("#avatar-link-input");
export const avatarImage = document.querySelector(".profile__avatar");
export const profileEditForm = document.forms["profile-form"];
export const addCardButton = document.querySelector(".profile__add-button");
export const addCardModal = document.querySelector("#add-card-popup");
export const cardListEl = ".cards__list";
export const addCardPopup = document.querySelector("#add-card-popup");
export const addNewCardButton = document.querySelector("#add-button");
export const addCardForm = document.forms["add-card-form"];
export const deleteCardForm = document.querySelector("#popup__delete-form");
export const previewImageModal = document.querySelector("#image-popup");
export const cardDeleteButton = deleteCardForm.querySelector(
  ".popup-delete-button"
);
export const previewImageElement = document.querySelector(
  "#image-popup .popup__image"
);
export const previewCaption = document.querySelector(
  "#image-popup .popup__caption"
);
export const cardTemplate = document.querySelector("#card-template");

export const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
  popupForm: "popup__form",
  addCardModal: "#add-card-popup",
};
