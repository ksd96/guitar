export default class PresenterBasket {
  constructor(store, view, api) {
    this.store = store;
    this.view = view;
    this.api = api;
    this._deleteGuitar = this._deleteGuitar.bind(this);
    this._addGuitar = this._addGuitar.bind(this);
    this._code = null;
  }

  init() {
    this._renderBasketGuitars();
    this._getAllPrice();
    this._initPromo();
    this._getNumberGuitars();
  }

  _getNumberGuitars() {
    const buttonIndicator = document.querySelector(`.header__button-indicator`);
    let quantity = null;
    Object.values(this.store.getGuitars()).forEach((item) => {
      quantity = quantity + item.count;
    });
    if (buttonIndicator && quantity === 0) {
      buttonIndicator.textContent = ``;
    } else if (buttonIndicator) {
      buttonIndicator.textContent = quantity;
    }
  }

  _initPromo() {
    const form = document.querySelector(`.basket__code-wrapper`);
    const code = document.querySelector(`.basket__code`);
    if (form) {
      form.addEventListener(`submit`, (evt) => {
        this._code = code.value;
        this._codeCheck(evt, this._code);
        code.value = ``;
      });
    }
  }

  _renderBasketGuitars() {
    this.view.renderBasketCards(Object.values(this.store.getGuitars()), this._deleteGuitar, this._addGuitar);
  }

  _deleteGuitar(evt, article, all) {
    this.store.deleteGuitar(article, all);
    this._renderBasketGuitars();
    // this.api.deleteGuitar(article, all);

    this.api.setCardsBasket(this.store.getGuitars());

    this._getAllPrice();
    this._codeCheck(evt, this._code);
    this._getNumberGuitars();
  }

  _addGuitar(evt, guitar) {
    this.store.addGuitar(guitar);
    this._renderBasketGuitars();
    // this.api.addCardInBasket(guitar);

    this.api.setCardsBasket(this.store.getGuitars());

    this._getAllPrice();
    this._codeCheck(evt, this._code);
    this._getNumberGuitars();
  }

  _getAllPrice() {
    const allPrice = document.querySelector(`.basket__all-price`);
    const priceItems = document.querySelectorAll(`.guitar__full-price-content`);
    if (priceItems && allPrice) {
      allPrice.textContent = ``;
      priceItems.forEach((item) => {
        allPrice.textContent = Number(allPrice.textContent) + Number(item.textContent);
      });
    }
  }

  _codeCheck(evt, code) {
    evt.preventDefault();
    const allPrice = document.querySelector(`.basket__all-price`);
    const button = document.querySelector(`.basket__code-submit`);
    const GITARAHIT = `GITARAHIT`;
    const SUPERGITARA = `SUPERGITARA`;
    const GITARA2020 = `GITARA2020`;
    if (code === GITARAHIT) {
      allPrice.textContent = (Number(allPrice.textContent) * 90) / 100;
      button.disabled = true;
    } else if (code === SUPERGITARA) {
      if (Number(allPrice.textContent) >= 700) {
        allPrice.textContent = Number(allPrice.textContent) - 700;
      } else {
        allPrice.textContent = 0;
      }
      button.disabled = true;
    } else if (code === GITARA2020) {
      let number = (Number(allPrice.textContent) * 30) / 100;
      if (number < 3500) {
        allPrice.textContent = Number(allPrice.textContent) - number;
        button.disabled = true;
      } else {
        allPrice.textContent = Number(allPrice.textContent) - 3500;
        button.disabled = true;
      }
    } else if (code === ``) {
      this.view.renderPopupCode(`Введите промокод`);
    } else if (code === null) {
      return;
    } else {
      this.view.renderPopupCode(`Промокод недействителен`);
    }
  }
}
