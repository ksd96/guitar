export default class View {
   // получение карточки гитары
  _getGuitarCard(guitar, clickHandler) {
    const template = document.querySelector(`#cardTemplate`);
    const clone = template.content.cloneNode(true);
    clone.querySelector(`.card__title`).textContent = guitar.name;
    clone.querySelector(`.card__price`).textContent = guitar.price;
    clone.querySelector(`.card__rating`).textContent = guitar.popularity;
    clone.querySelector(`.card__image`).src = guitar.img;
    clone.querySelector(`.card__button_type_buy`).addEventListener(`click`, () => {
      this.renderPopup(guitar, clickHandler);
    });
    return clone;
  }

  // получение попапа с ссылкой в корзину
  _getPopupAdded() {
    const template = document.querySelector(`#popupAddedTemplate`);
    const clone = template.content.cloneNode(true);
    const overlay = document.querySelector(`.overlay`);
    const page = document.querySelector(`.page`);
    clone.querySelector(`.popup__button_type_go-shoping`).addEventListener(`click`, () => {
      overlay.classList.remove(`overlay_opened`);
      page.classList.remove(`page_no-scrole`);
    });
    clone.querySelector(`.popup__close`).addEventListener(`click`, () => {
      overlay.classList.remove(`overlay_opened`);
      page.classList.remove(`page_no-scrole`);
    });
    return clone;
  }

  // отрисовка попапа с ссылкой в корзину
  renderPopupAdded() {
    const container = document.querySelector(`.overlay`);
    container.classList.add(`overlay_opened`);

    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    const popup = this._getPopupAdded();
    container.appendChild(popup);
  }

  // получение попапа
  _getPopup(guitar, clickHandler) {
    const template = document.querySelector(`#popupTemplate`);
    const clone = template.content.cloneNode(true);
    clone.querySelector(`.popup__guitar-name`).textContent = guitar.name;
    clone.querySelector(`.popup__guitar-price`).textContent = guitar.price;
    clone.querySelector(`.popup__guitar-article`).textContent = guitar.article;
    clone.querySelector(`.popup__guitar-type`).textContent = guitar.type;
    clone.querySelector(`.popup__guitar-strings`).textContent = guitar.strings;
    clone.querySelector(`.popup__img`).src = guitar.img;
    clone.querySelector(`.popup__close`).addEventListener(`click`, () => {
      const overlay = document.querySelector(`.overlay`);
      const page = document.querySelector(`.page`);
      overlay.classList.remove(`overlay_opened`);
      page.classList.remove(`page_no-scrole`);
    });
    clone.querySelector(`.popup__button`).addEventListener(`click`, () => {
      this.renderPopupAdded();
      clickHandler(guitar);
    });
    return clone;
  }

  // отрисовка попапа
  renderPopup(guitar, clickHandler) {
    const container = document.querySelector(`.overlay`);
    const page = document.querySelector(`.page`);
    container.classList.add(`overlay_opened`);
    page.classList.add(`page_no-scrole`);


    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    const popup = this._getPopup(guitar, clickHandler);
    container.appendChild(popup);
  }

  // получение элемента фильтра
  _getFilterItemType(filter, name, clickHandler1, clickHandler2) {
    const template = document.querySelector(`#filterItemTemplate`);
    const clone = template.content.cloneNode(true);
    clone.querySelector(`.filter__name`).textContent = filter;
    clone.querySelector(`.filter__input`).name = name;
    clone.querySelector(`.filter__input`).value = filter;
    clone.querySelector(`.filter__input`).addEventListener(`click`, () => {
      clickHandler2();
    });
    if (name === `types`) {
      clone.querySelector(`.filter__input`).addEventListener(`click`, () => {
        if (clickHandler1) {
          clickHandler1();
        }
      });
    }
    return clone;
  }

  // получшение кнопки пагинации
  _getPageButton(number, clickHandler) {
    const template = document.querySelector(`#pageItemTemplate`);
    const clone = template.content.cloneNode(true);
    clone.querySelector(`.pages__button`).textContent = number;
    clone.querySelector(`.pages__button`).addEventListener(`click`, () => {
      clickHandler(number);
    });
    if (number === 1) {
      clone.querySelector(`.pages__button`).classList.add(`pages__button_active`);
    }
    return clone;
  }

  // отрисовка элемента фильтра
  renderFilterItems(filter, container, name, clickHandler1, clickHandler2) {
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    filter.forEach((item) => {
      const card = this._getFilterItemType(item, name, clickHandler1, clickHandler2);
      container.appendChild(card);
    });
  }

  // отрисовка карточки гитары
  renderCards(guitars, clickHandler) {
    const container = document.querySelector('.cards__list');

    // очищаем
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    // рисуем новые карточки
    guitars.forEach((guitar) => {
      const card = this._getGuitarCard(guitar, clickHandler);
      container.appendChild(card);
    });
  }

  // отрисовка кнопки пагинации
  renderPageButton(numbers, clickHandler) {
    const container = document.querySelector('.pages__list');

    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    if (numbers <= 1) {
      return;
    }

    for (let i = 1; i <= numbers; i++) {
      const button = this._getPageButton(i, clickHandler);
      container.appendChild(button);
    }
  }
}
