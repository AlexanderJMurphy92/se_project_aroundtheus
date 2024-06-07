class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._userId = cardData.userId;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleLikeButton = this._handleLikeButton.bind(this);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );
    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  renderLike() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button-active");
    } else {
      this._likeButton.classList.remove("card__like-button-active");
    }
  }

  _handleLikeButton() {
    this._isLiked = !this._isLiked;
    this.renderLike();
    this._handleLikeClick(this);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeCounter = this._cardElement.querySelector(".card__like-counter");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this.renderLike(); // Call renderLike to set initial like state
    this._setEventListeners();
    return this._cardElement;
  }

  handleTrashButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}

export default Card;
