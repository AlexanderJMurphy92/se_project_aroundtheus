import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config, elements } from "../utils/constants.js";

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
