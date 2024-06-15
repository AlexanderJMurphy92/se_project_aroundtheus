import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Api from "../components/Api.js";

document.addEventListener("DOMContentLoaded", () => {
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "aab398bd-53ed-43f4-a142-4dc87cb0dd79",
      "Content-Type": "application/json",
    },
  });

  const userInformation = new UserInfo({
    name: ".profile__header",
    description: ".profile__description",
    avatar: ".profile__avatar",
  });

  let cardSection;
  api
    .getAppInfo()
    .then(([userInfo, initialCards]) => {
      console.log("User Info from API:", userInfo); // Debugging
      userInformation.setUserInfo(userInfo);
      userInformation.setUserAvatar(userInfo);
      if (Array.isArray(initialCards)) {
        cardSection = new Section({ renderer: renderCard }, ".cards__list");
        cardSection.renderItems(initialCards);
      } else {
        console.error("Initial cards data is not an array:", initialCards);
      }
    })
    .catch((err) => {
      console.error(err);
    });

  function renderCard(cardData) {
    const card = new Card(
      cardData,
      "#card-template",
      handleImageClick,
      handleCardDeleteClick,
      handleLikeClick
    ).getView();
    cardSection.addItem(card);
  }

  const cardPreview = new PopupWithImage("#image-popup");
  const confirmDeletePopup = new PopupWithConfirm("#delete-card-popup");
  cardPreview.setEventListeners();

  const profileEditValidator = new FormValidator(
    constants.config,
    document.querySelector("#profile-form")
  );
  const addCardValidator = new FormValidator(
    constants.config,
    document.querySelector("#add-card-form")
  );
  const avatarValidator = new FormValidator(
    constants.config,
    document.querySelector("#avatar-form")
  );

  profileEditValidator.enableValidation();
  addCardValidator.enableValidation();
  avatarValidator.enableValidation();

  const avatarImagePopup = new PopupWithForm(
    "#edit-avatar-popup",
    handleAvatarFormSubmit
  );

  avatarImagePopup.setEventListeners();
  document.querySelector(".profile__avatar").addEventListener("click", () => {
    console.log("Avatar image clicked");
    avatarImagePopup.open();
  });

  function handleImageClick(name, link) {
    cardPreview.open({ name, link });
  }

  function createCard(cardData) {
    const cardElement = new Card(
      cardData,
      "#card-template",
      handleImageClick,
      handleCardDeleteClick,
      handleLikeClick
    );
    return cardElement.getView();
  }

  const profileEditForm = new PopupWithForm("#profile-edit-popup", (data) => {
    const { header, description } = data;
    profileEditForm.renderLoading(true);

    api
      .updateUserInfo(header, description)
      .then((res) => {
        userInformation.setUserInfo(res);
        userInformation.setUserAvatar(res);
        profileEditForm.close();
        profileEditValidator.disableButton();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      })
      .finally(() => {
        profileEditForm.renderLoading(false);
        profileEditValidator._enableButton();
      });
  });

  constants.profileEditButton.addEventListener("click", () => {
    profileEditValidator.resetValidation();
    api
      .getUserInfo()
      .then((userInfo) => {
        constants.profileTitleInput.value = userInfo.name || "";
        constants.profileDescriptionInput.value = userInfo.about || "";
        profileEditForm.open();
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
      });
  });

  profileEditForm.setEventListeners();

  function handleAvatarFormSubmit(data) {
    avatarImagePopup.renderLoading(true);

    api
      .updateAvatar(data.link)
      .then((res) => {
        userInformation.setUserAvatar(res);
      })
      .then(() => {
        console.log("Avatar has been updated");
        avatarImagePopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        avatarImagePopup.renderLoading(false);
        avatarValidator.disableButton();
      });
  }

  function handleCardDeleteClick(card) {
    console.log(card);
    confirmDeletePopup.open();
    confirmDeletePopup.setSubmitAction(() => {
      return api
        .deleteCard(card._id)
        .then(() => {
          confirmDeletePopup.close();
          card.handleTrashButton();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function handleLikeClick(cardId, action) {
    if (action === "dislike") {
      return api.dislikeCard(cardId);
    } else if (action === "like") {
      return api.likeCard(cardId);
    } else {
      return Promise.reject(new Error("Invalid action"));
    }
  }

  constants.profileEditButton.addEventListener("click", () => {
    profileEditValidator.resetValidation();
    const userData = userInformation.getUserInfo();
    if (userData) {
      constants.profileTitleInput.value = userData.name || "";
      constants.profileDescriptionInput.value = userData.about || "";
      profileEditForm.open();
    } else {
      console.error("User data is undefined");
    }
  });

  const addCardForm = new PopupWithForm("#add-card-popup", (data) => {
    const { title, URL } = data;
    addCardForm.renderLoading(true);
    api
      .addCard(title, URL)
      .then((cardData) => {
        cardSection.addItem(createCard(cardData));
        addCardForm.close();
      })
      .catch((err) => {
        console.error("Error adding card:", err);
      })
      .finally(() => {
        addCardForm.renderLoading(false);
        addCardValidator.disableButton();
      });
  });
  addCardForm.setEventListeners();
  confirmDeletePopup.setEventListeners();

  constants.addCardButton.addEventListener("click", () => {
    console.log("Add card button clicked");
    addCardForm.open();
  });
});
