import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".popup__button");
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    this._originalButtonText = this._getButtonText();
    this._setEventListeners();
  }

  _getInputValues() {
    const inputItems = {};
    this._inputList.forEach((input) => {
      const { name, value } = input;
      inputItems[name] = value;
    });
    return inputItems;
  }

  // Method to retrieve the current button text
  _getButtonText() {
    return this._submitButton.textContent;
  }

  // Method to set the button text
  _setButtonText(text) {
    this._submitButton.textContent = text;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._setButtonText("Saving...");
      this._submitButton.disabled = true;
    } else {
      this._setButtonText(this._originalButtonText);
    }
  }

  _handleSubmit(event) {
    event.preventDefault();
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
    this._resetForm();
    this.close();
  }

  _setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => this._handleSubmit(e));
  }

  _resetForm() {
    this._popupForm.reset();
  }
}
