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

// Constants
const elements = {
  imageModalCloseButton: document.querySelector("#image-modal .modal__close"),
  profileEditButton: document.querySelector("#profile-edit-button"),
  profileEditModal: document.querySelector("#profile-edit-modal"),
  addCardModal: document.querySelector("#add-card-modal"),
  profileEditCloseButton: document.querySelector(
    "#profile-edit-modal .modal__close"
  ),

  addCardCloseButton: document.querySelector("#add-card-modal .modal__close"),
  addNewCardButton: document.querySelector(".profile__add-button"),
  profileName: document.querySelector(".profile__header"),
  profileDescription: document.querySelector(".profile__description"),
  cardTitleInput: document.querySelector(".modal__input_type_title"),
  cardUrlInput: document.querySelector(".modal__input_type_url"),
  profileTitleInput: document.querySelector("#profile-title-input"),
  profileDescriptionInput: document.querySelector("#profile-description-input"),
  profileEditForm: document.querySelector("#profile-edit-modal .modal__form"),
  addCardFormElement: document.querySelector("#add-card-modal .modal__form"),
  cardListEl: document.querySelector(".cards__list"),
  imageModal: document.querySelector("#image-modal"),

  cardTemplate: document
    .querySelector("#card-template")
    .content.querySelector(".card"),
};

// Functions
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = createCardElement(cardData);
  wrapper.prepend(cardElement);
}

function createCardElement(cardData) {
  const cardElement = elements.cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-active");
  });

  deleteButton.addEventListener("click", (event) => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", (event) => {
    event.stopPropagation();
    const imageModal = document.querySelector("#image-modal");
    const modalImage = imageModal.querySelector(".modal__image");
    const modalTitle = imageModal.querySelector(".modal__caption");
    modalImage.src = cardImageEl.src;
    modalImage.alt = cardImageEl.alt;
    modalTitle.textContent = cardTitleEl.textContent;
    openModal(imageModal);
  });

  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  elements.profileName.textContent = elements.profileTitleInput.value;
  elements.profileDescription.textContent =
    elements.profileDescriptionInput.value;
  closePopup(elements.profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = elements.cardTitleInput.value;
  const link = elements.cardUrlInput.value;
  renderCard({ name, link }, elements.cardListEl);
  elements.cardTitleInput.value = "";
  elements.cardUrlInput.value = "";
  closePopup(elements.addCardModal);
}

// Event listeners
elements.profileEditButton.addEventListener("click", () => {
  elements.profileTitleInput.value = elements.profileName.textContent;
  elements.profileDescriptionInput.value =
    elements.profileDescription.textContent;
  openModal(elements.profileEditModal);
});

elements.profileEditCloseButton.addEventListener("click", () => {
  closePopup(elements.profileEditModal);
});

elements.addCardCloseButton.addEventListener("click", () => {
  closePopup(elements.addCardModal);
});

elements.imageModalCloseButton.addEventListener("click", () => {
  closePopup(elements.imageModal);
});

elements.profileEditForm.addEventListener("submit", handleProfileEditSubmit);
elements.addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
elements.addNewCardButton.addEventListener("click", () => {
  openModal(elements.addCardModal);
});

// Initial rendering of cards
initialCards.forEach((cardData) => renderCard(cardData, elements.cardListEl));
