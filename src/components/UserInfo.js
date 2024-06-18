export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._title = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      title: this._title.textContent,
      description: this._description.textContent,
      avatar: this._avatar.src,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._title.textContent = data.name;
    this._description.textContent = data.about;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar.avatar;
  }
}
