import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupImage = document.querySelector(".popup__image");
    this._popupImageDescription = document.querySelector(".popup__caption");
  }

  open(data) {
    this._popupImage.setAttribute("src", data.link);
    this._popupImage.setAttribute("alt", data.name);
    this._popupImageDescription.textContent = data.name;
    super.open();
  }
}
