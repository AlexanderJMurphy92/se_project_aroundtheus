import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(
      "#image-popup .popup__image"
    );
    this._imageCaption = this._popupElement.querySelector(
      "#image-popup .popup__caption"
    );
  }

  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._imageCaption.textContent = name;
    super.open();
  }
}
