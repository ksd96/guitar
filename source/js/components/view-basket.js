export default class ViewBasket {
  _getPopupCode(text) {
    const template = document.querySelector(`#popupCodeTemplate`);
    const clone = template.content.cloneNode(true);
    const page = document.querySelector(`.page`);
    const overlay = document.querySelector(`.overlay`);
    if (overlay) {
      overlay.addEventListener(`click`, (event) => {
        if (event.target === event.currentTarget) {
          overlay.classList.remove(`overlay_opened`);
          page.classList.remove(`page_no-scrole`);
        }
      });
    }
    window.addEventListener(`keydown`, (event) => {
      if (event.key === `Escape`) {
        if (overlay.classList.contains(`overlay_opened`)) {
          overlay.classList.remove(`overlay_opened`);
          page.classList.remove(`page_no-scrole`);
        }
      }
    });
    clone.querySelector(`.popup__close`).addEventListener(`click`, () => {
      overlay.classList.remove(`overlay_opened`);
      page.classList.remove(`page_no-scrole`);
    });
    clone.querySelector(`.popup__title`).textContent = text;
    return clone;
  }

  renderPopupCode(text) {
    const container = document.querySelector(`.overlay`);
    const page = document.querySelector(`.page`);
    container.classList.add(`overlay_opened`);
    page.classList.add(`page_no-scrole`);

    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    const popup = this._getPopupCode(text);
    container.appendChild(popup);
  }
  // получение элемента корзины
  _getBasketCard(guitar, clickHandler1, clickHandler2) {
    const template = document.querySelector(`#cardBasketTemplate`);
    const clone = template.content.cloneNode(true);
    clone.querySelector(`.guitar__name`).textContent = guitar.name;
    clone.querySelector(`.guitar__price-content`).textContent = guitar.price;
    clone.querySelector(`.guitar__article-content`).textContent = guitar.article;
    clone.querySelector(`.guitar__img`).src = `${guitar.img}.png`;
    clone.querySelector(`.guitar__img-webp`).srcset = `${guitar.img}.webp`;
    clone.querySelector(`.guitar__type-content`).textContent = guitar.type;
    clone.querySelector(`.guitar__strings`).textContent = guitar.strings;
    clone.querySelector(`.guitar__quantity`).textContent = guitar.count;
    clone.querySelector(`.guitar__full-price-content`).textContent = guitar.price * guitar.count;
    clone.querySelector(`.guitar__delete`).addEventListener(`click`, () => {
      this.renderPopup(guitar, clickHandler1);
    });
    clone.querySelector(`.guitar__button_type_more`).addEventListener(`click`, (evt) => {
      clickHandler2(evt, guitar);
    });
    clone.querySelector(`.guitar__button_type_less`).addEventListener(`click`, (evt) => {
      if (guitar.count === 1) {
        this.renderPopup(guitar, clickHandler1);
      } else {
        clickHandler1(evt, guitar.article, false);
      }
    });
    return clone;
  }

  // получение попапа удаления товара
  _getBasketPopup(guitar, clickhandler) {
    const template = document.querySelector(`#popupBasketTemplate`);
    const clone = template.content.cloneNode(true);
    const page = document.querySelector(`.page`);
    const overlay = document.querySelector(`.overlay`);
    if (overlay) {
      overlay.addEventListener(`click`, (event) => {
        if (event.target === event.currentTarget) {
          overlay.classList.remove(`overlay_opened`);
          page.classList.remove(`page_no-scrole`);
        }
      });
    }
    window.addEventListener(`keydown`, (event) => {
      if (event.key === `Escape`) {
        if (overlay.classList.contains(`overlay_opened`)) {
          overlay.classList.remove(`overlay_opened`);
          page.classList.remove(`page_no-scrole`);
        }
      }
    });
    clone.querySelector(`.popup__guitar-name`).textContent = guitar.name;
    clone.querySelector(`.popup__guitar-price`).textContent = guitar.price;
    clone.querySelector(`.popup__guitar-article`).textContent = guitar.article;
    clone.querySelector(`.popup__guitar-type`).textContent = guitar.type;
    clone.querySelector(`.popup__guitar-strings`).textContent = guitar.strings;
    clone.querySelector(`.popup__img`).src = `${guitar.img}.png`;
    clone.querySelector(`.popup__img-webp`).srcset = `${guitar.img}.webp`;
    clone.querySelector(`.popup__close`).addEventListener(`click`, () => {
      overlay.classList.remove(`overlay_opened`);
      page.classList.remove(`page_no-scrole`);
    });
    clone.querySelector(`.popup__button_type_go-shoping`).addEventListener(`click`, () => {
      overlay.classList.remove(`overlay_opened`);
      page.classList.remove(`page_no-scrole`);
    });
    clone.querySelector(`.popup__button_type_delete`).addEventListener(`click`, (evt) => {
      overlay.classList.remove(`overlay_opened`);
      page.classList.remove(`page_no-scrole`);
      clickhandler(evt, guitar.article, true);
    });
    return clone;
  }

    // отрисовка попапа
    renderPopup(guitar, clickhandler) {
      const container = document.querySelector(`.overlay`);
      const page = document.querySelector(`.page`);
      container.classList.add(`overlay_opened`);
      page.classList.add(`page_no-scrole`);

      while (container.firstChild) {
        container.removeChild(container.lastChild);
      }

      const popup = this._getBasketPopup(guitar, clickhandler);
      container.appendChild(popup);
      document.querySelector(`.popup__button_type_delete`).focus();
    }

  // отрисовка элемента корзины
  renderBasketCards(guitars, clickHandler1, clickHandler2) {
    const container = document.querySelector('.basket__list');
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
    guitars.forEach((guitar) => {
      const card = this._getBasketCard(guitar, clickHandler1, clickHandler2);
      container.appendChild(card);
    });
  }
}
