import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._setEventListeners();
  }

  _getInputValues() {
    const inputList = this._popupForm.querySelectorAll(".popup__input");
    const inputItems = {};
    inputList.forEach((input) => {
      const { name, value } = input;
      inputItems[name] = value;
    });
    return inputItems;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();
    });
  }
}
