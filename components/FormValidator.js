export default class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  // Private method to show input error
  _showInputError(inputElement) {
    const errorMessageElement = this.formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this.settings.inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this.settings.errorClass);
  }

  // Private method to hide input error
  _hideInputError(inputElement) {
    const errorMessageElement = this.formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this.settings.inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this.settings.errorClass);
  }

  // Private method to check input validity
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Private method to check if any input is invalid
  _hasInvalidInput() {
    return !this.inputElements.every((inputEl) => inputEl.validity.valid);
  }

  // Private method to toggle button state
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.submitButton.classList.add(this.settings.inactiveButtonClass);
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove(this.settings.inactiveButtonClass);
      this.submitButton.disabled = false;
    }
  }

  // Public method to enable validation
  enableValidation() {
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.inputElements = [
      ...this.formElement.querySelectorAll(this.settings.inputSelector),
    ];
    this.submitButton = this.formElement.querySelector(
      this.settings.submitButtonSelector
    );

    this.setEventListeners();
  }

  // Optional public method to reset validation
  resetValidation() {
    this._toggleButtonState();
    this.inputElements.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }

  // Private method to set event listeners
  setEventListeners() {
    this._toggleButtonState();
    this.inputElements.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }
}

// Usage
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formElements = document.querySelectorAll(config.formSelector);
formElements.forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});
