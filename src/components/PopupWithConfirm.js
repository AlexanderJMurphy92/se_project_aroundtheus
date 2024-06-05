import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this.popupForm = this._popupElement.querySelector(".popup__form");
    this._popupButton = this._popupElement.querySelector(".popup__button");
    this.setEventListeners();
    this._popupButtonText = this._popupButton.textContent;
  }

  setSubmitAction(submitHandler) {
    this._handleFormSubmit = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      return this._handleFormSubmit().then(() => {
        this.close();
      });
    });
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    if (typeof this._submitHandler === "function") {
      this._submitHandler().then(() => {
        this.close();
      });
    }
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = "Deleting...";
    } else {
      this._popupButton.textContent = this._popupButtonText;
    }
  }
}
