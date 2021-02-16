(function () {
  'use strict';

  const Method = {
    GET: `GET`,
    POST: `POST`,
    PUT: `PUT`,
    DELETE: `DELETE`
  };

  const toJSON = (response) => {
    return response.json();
  };

  class API {
    constructor(data) {
      this._data = data;
    }

    getCards() {
      return this._load({
        url: this._data
      })
        .then(toJSON)
        .then((data) => {
          return data.guitars;
        });
    }

    getCardsBasket() {
      const cardsBasket = JSON.parse(localStorage.getItem('guitarsBasket'));
      return cardsBasket.data;
    }

    addCardInBasket(guitar) {
      const dataBasket = JSON.parse(localStorage.getItem(`guitarsBasket`));
      if (dataBasket.data[guitar.id]) {
        dataBasket.data[guitar.id].count++;
      } else {
        guitar.count = 1;
        dataBasket.data[guitar.id] = guitar;
      }
      localStorage.setItem(`guitarsBasket`, JSON.stringify(dataBasket));
    }

    deleteGuitar(id, all) {
      const dataBasket = JSON.parse(localStorage.getItem(`guitarsBasket`));
      if (all === true) {
        delete dataBasket.data[id];
      } else if (all === false && dataBasket.data[id].count >= 2) {
        dataBasket.data[id].count--;
      } else {
        delete dataBasket.data[id];
      }
      localStorage.setItem(`guitarsBasket`, JSON.stringify(dataBasket));
    }

    setCardsBasket(guitars) {
      const dataBasket = JSON.parse(localStorage.getItem(`guitarsBasket`));
      dataBasket.data = guitars;
      localStorage.setItem(`guitarsBasket`, JSON.stringify(dataBasket));
    }

    _load({url, method = Method.GET, body = null, headers = new Headers()}) {
      return fetch(url, { method, body, headers});
    }
  }

  class Store {
    constructor(guitars) {
      this.guitars = guitars;

      this.filters = {
        type: this.getTypesGuitar(),
        strings: this.getStringsGuitar(),
        price: {
          min: this.getMinGuitarsPrice(),
          max: this.getMaxGuitarsPrice()
        }
      };

      this.sort = {
        price: null,
        popularity: null
      };
    }

    // получает значение сортировки по цене
    setSortPrice(value) {
      this.sort.price = value;
    }

    // получает значение сортировки по популярности
    setSortPopularity(value) {
      this.sort.popularity = value;
    }

    // сортирует по цене
    getSortPrice() {
      const guitars = this.getFilteredGuitars();
      if (this.sort.price === `min`) {
        guitars.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (this.sort.price === `max`) {
        guitars.sort((a, b) => {
          return b.price - a.price;
        });
      }
      return guitars;
    }

    // сортирует по популярности
    getSortPopularity() {
      const guitars = this.getFilteredGuitars();
      if (this.sort.popularity === `min`) {
        guitars.sort((a, b) => {
          return a.popularity - b.popularity;
        });
      } else if (this.sort.popularity === `max`) {
        guitars.sort((a, b) => {
          return b.popularity - a.popularity;
        });
      }
      return guitars;
    }

    // отдает текущие значения фильтров
    getFiltersValue() {
      const filters = {
        type: this.filters.type,
        strings: this.filters.strings,
        priceMin: this.filters.price.min,
        priceMax: this.filters.price.max,
      };

      return filters;
    }

    // отдает существующие типы гитар
    getTypesGuitar() {
      const types = Object.values(this.guitars).map((guitar) => guitar.type);
      return new Set(types);
    }

    // отдает существующие типы гитар по количеству струн
    getStringsGuitar() {
      const strings = Object.values(this.guitars).map((guitar) => guitar.strings);
      return new Set(strings);
    }

    // отдает типы гитар по количеству струн из определенного массива
    getStringsGuitarArray(array) {
      const strings = array.map((guitar) => guitar.strings);
      return new Set(strings);
    }

    // отдает максимальную стоимость гитар
    getMaxGuitarsPrice() {
      const prices = Object.values(this.guitars).map((guitar) => guitar.price);
      return Math.max.apply(null, prices);
    }

    // отдает минимальную стоимость гитар
    getMinGuitarsPrice() {
      const prices = Object.values(this.guitars).map((guitar) => guitar.price);
      return Math.min.apply(null, prices);
    }

    // фильтрует по типу
    filteringByType(cards, types) {
      if (types.length === 0) {
        return cards;
      } else {
        const guitars = [];
        types.forEach((type) => {
          Object.values(cards).forEach((guitar) => {
            if (guitar.type === type) {
              guitars.push(guitar);
            }
          });
        });
        return guitars;
      }
    }

    // фильтрует по колличеству струн
    filteringByStrings(cards, strings) {
      if (strings.length === 0) {
        return cards;
      } else {
        const guitars = [];
        strings.forEach((item) => {
          Object.values(cards).forEach((guitar) => {
            if (guitar.strings === item) {
              guitars.push(guitar);
            }
          });
        });
        return guitars;
      }
    }

    // фильтрует по цене
    filteringByPrice(cards, minPrice, maxPrice) {
      const guitars = Object.values(cards).filter((guitar) => guitar.price >= minPrice && guitar.price <= maxPrice);
      return guitars;
    }

    // получает новые значения фильтров
    setFilters(objectData) {
      this.filters.type = objectData.type;
      this.filters.strings = objectData.strings;
      this.filters.price.min = objectData.priceMin;
      this.filters.price.max = objectData.priceMax;
    }

    // отдает отфильтрованный массив гитар
    getFilteredGuitars() {
      let filteredCards = this.guitars;
      filteredCards = this.filteringByType(filteredCards, this.filters.type);
      filteredCards = this.filteringByStrings(filteredCards, this.filters.strings);
      filteredCards = this.filteringByPrice(filteredCards, this.filters.price.min, this.filters.price.max);
      return filteredCards;
    }
  }

  class View {
    // получение карточки гитары
    _getGuitarCard(guitar, clickHandler) {
      const template = document.querySelector(`#cardTemplate`);
      const clone = template.content.cloneNode(true);
      clone.querySelector(`.card__title`).textContent = guitar.name;
      clone.querySelector(`.card__price-content`).textContent = guitar.price;
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
      const overlay = document.querySelector(`.overlay`);
      const page = document.querySelector(`.page`);
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
      clone.querySelector(`.popup__img`).src = guitar.img;
      clone.querySelector(`.popup__close`).addEventListener(`click`, () => {
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

  class Presenter {
    constructor(store, view, api) {
      this.store = store;
      this.view = view;
      this.api = api;
      this._clickFilterItem = this._clickFilterItem.bind(this);
      this._renderPageNumberCards = this._renderPageNumberCards.bind(this);
      this._addCardInBasket = this._addCardInBasket.bind(this);
      this._getFilteredGuitars = this._getFilteredGuitars.bind(this);
      this._currentData = this.store.getFilteredGuitars();
      this.basketButton = document.querySelector(`.header__button_basket`);
      this.buttonSortPrice = null;
      this.buttonSortPopularity = null;
      this.buttonSortMin = null;
      this.buttonSortMax = null;
      this.containerFilterType = null;
      this.containerFilterNum = null;
      this.priceMin = null;
      this.priceMax = null;
      this.buttonNextPage = null;
    }

    init() {
      this._renderCatalogContainer();
      this._getNumberGuitars();
    }

    // добавление карточки в корзину
    _addCardInBasket(guitar) {
      this.api.addCardInBasket(guitar);
      this._getNumberGuitars();
    }

    // отрисовка каталога
    _renderCatalogContainer() {
      this.buttonSortPrice = document.querySelector(`.sort__button-type_type_price`);
      this.buttonSortPopularity = document.querySelector(`.sort__button-type_type_popularity`);
      this.buttonSortMin = document.querySelector(`.sort__button_type_min`);
      this.buttonSortMax = document.querySelector(`.sort__button_type_max`);
      this.containerFilterType = document.querySelector(`.filter__list_type`);
      this.containerFilterNum = document.querySelector(`.filter__list_numbers`);
      this.priceMin = document.querySelector(`.filter__price-input_type_min`);
      this.priceMax = document.querySelector(`.filter__price-input_type_max`);
      this.buttonNextPage = document.querySelector(`.pages__button-next`);
      this._renderGuitars();
      this._renderFilterItems(this.store.getFiltersValue().type, this.containerFilterType, `types`);
      this._renderFilterItems(this.store.getFiltersValue().strings, this.containerFilterNum, `numbers`);
      this._renderPrice();
      this._buttonsListner();
    }

    // получение колличества гитар в корзине
    _getNumberGuitars() {
      const buttonIndicator = document.querySelector(`.header__button-indicator`);
      let quantity = null;
      Object.values(this.api.getCardsBasket()).forEach((item) => {
        quantity = quantity + item.count;
      });
      if (quantity === 0) {
        buttonIndicator.textContent = ``;
      } else {
        buttonIndicator.textContent = quantity;
      }
    }

    // пагинация
    _renderPageItems(cards) {
      const numbers = +Math.ceil((cards.length) / 9);
      if (numbers <= 1) {
        this.buttonNextPage.style.display = `none`;
      } else {
        this.buttonNextPage.style.display = `block`;
      }
      this.view.renderPageButton(numbers, this._renderPageNumberCards);
    }

    // отрисовка карточек на определенной странице
    _renderPageNumberCards(number) {
      const valueOne = (number * 9) - 9;
      const valueTwo = valueOne + 9;
      const buttons = document.querySelectorAll(`.pages__button`);
      this.view.renderCards(this._currentData.slice(valueOne, valueTwo));
      this._changeButtonsStates(buttons[number - 1], `pages__button`);
    }

    // получение карточек на следующей странице
    _getNextPage() {
      const numbers = +Math.ceil((this._currentData.length) / 9);
      const currentPage = document.querySelector(`.pages__button_active`).textContent;
      if (numbers === +currentPage) {
        return;
      }
      this._renderPageNumberCards(+currentPage + 1);
    }

    // слушатели на кнопки
    _buttonsListner() {
      this.buttonSortPrice.addEventListener(`click`, () => {
        this._changeButtonsStates(this.buttonSortPrice, `sort__button-type`);
        this._sortCardsByPrice();
      });
      this.buttonSortPopularity.addEventListener(`click`, () => {
        this._changeButtonsStates(this.buttonSortPopularity, `sort__button-type`);
        this._sortCardsByPopularity();
      });
      this.buttonSortMin.addEventListener(`click`, () => {
        this._changeButtonsStates(this.buttonSortMin, `sort__button`);
        this._sortCardsMinMax(`min`);
      });
      this.buttonSortMax.addEventListener(`click`, () => {
        this._changeButtonsStates(this.buttonSortMax, `sort__button`);
        this._sortCardsMinMax(`max`);
      });
      this.priceMin.addEventListener(`blur`, () => {
        this._getFilteredGuitars();
        this._clickFilterItem();
      });
      this.priceMax.addEventListener(`blur`, () => {
        this._getFilteredGuitars();
        this._clickFilterItem();
      });
      this.buttonNextPage.addEventListener(`click`, () => {
        this._getNextPage();
      });
    }

    // отрисовка отфильтрованных гитар
    _getFilteredGuitars() {
      this._setFilteredGuitars();
      this._currentData = this.store.getFilteredGuitars();
      this._renderGuitars();
    }

    // сортировка по цене
    _sortCardsByPrice() {
      if (!this.buttonSortMin.classList.contains(`sort__button_active`) && !this.buttonSortMax.classList.contains(`sort__button_active`)) {
        this.buttonSortMin.classList.add(`sort__button_active`);
        this.store.setSortPrice(`min`);
      } else if (this.buttonSortMin.classList.contains(`sort__button_active`)) {
        this.store.setSortPrice(`min`);
      } else if (this.buttonSortMax.classList.contains(`sort__button_active`)) {
        this.store.setSortPrice(`max`);
      }
      this.view.renderCards(this.store.getSortPrice().slice(0, 9));
      this._currentData = this.store.getSortPrice();
      this._renderPageItems(this._currentData);
    }

    // сортировка по популярности
    _sortCardsByPopularity() {
      if (!this.buttonSortMin.classList.contains(`sort__button_active`) && !this.buttonSortMax.classList.contains(`sort__button_active`)) {
        this.buttonSortMin.classList.add(`sort__button_active`);
        this.store.setSortPopularity(`min`);
      } else if (this.buttonSortMin.classList.contains(`sort__button_active`)) {
        this.store.setSortPopularity(`min`);
      } else if (this.buttonSortMax.classList.contains(`sort__button_active`)) {
        this.store.setSortPopularity(`max`);
      }
      this.view.renderCards(this.store.getSortPopularity().slice(0, 9));
      this._currentData = this.store.getSortPopularity();
      this._renderPageItems(this._currentData);
    }

    // сортировка от меньшего к большему и наоборот
    _sortCardsMinMax(value) {
      if ((!this.buttonSortPrice.classList.contains(`sort__button-type_active`) && !this.buttonSortPopularity.classList.contains(`sort__button-type_active`)) || this.buttonSortPrice.classList.contains(`sort__button-type_active`)) {
        this.buttonSortPrice.classList.add(`sort__button-type_active`);
        this.store.setSortPrice(value);
        this.view.renderCards(this.store.getSortPrice().slice(0, 9));
        this._currentData = this.store.getSortPrice();
        this._renderPageItems(this._currentData);
      } else if (this.buttonSortPopularity.classList.contains(`sort__button-type_active`)) {
        this.store.setSortPopularity(value);
        this.view.renderCards(this.store.getSortPopularity().slice(0, 9));
        this._currentData = this.store.getSortPopularity();
        this._renderPageItems(this._currentData);
      }
    }

    // смена состояний у кнопок
    _changeButtonsStates(item, name) {
      const buttons = document.querySelectorAll(`.${name}_active`);
      buttons.forEach((button) => {
        button.classList.remove(`${name}_active`);
      });
      item.classList.add(`${name}_active`);
    }

    // валидация фильтра по типу гитар
    _clickFilterItem() {
      this._setFilteredGuitars();
      const typeGuitars = this.store.getStringsGuitarArray(this.store.getFilteredGuitars());
      const typeGuitarsAll = document.querySelectorAll(`[name="numbers"]`);
      typeGuitarsAll.forEach((item) => {
        item.disabled = true;
      });
      typeGuitars.forEach((item) => {
        typeGuitarsAll.forEach((item2) => {
          if (item === +item2.value) {
            item2.disabled = false;
          }
        });
      });
    }

    // отрисовка фильтров по типу гитар и колличеству струн
    _renderFilterItems(filter, container, name) {
      this.view.renderFilterItems(filter, container, name, this._clickFilterItem, this._getFilteredGuitars);
    }

    // нажатие только на цифры
    _pressOnlyNumbers(event) {
      if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 || (event.keyCode === 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
      } else {
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
          event.preventDefault();
        }
      }
    }

    // валидация фильтров по цене
    _priceFilterValid() {
      this.priceMin.addEventListener(`blur`, () => {
        if (+this.priceMin.value < +this.store.getMinGuitarsPrice()) {
          this.priceMin.value = this.store.getMinGuitarsPrice();
        } else if (+this.priceMin.value >= +this.priceMax.value) {
          this.priceMin.value = this.priceMax.value;
        }
      });
      this.priceMax.addEventListener(`blur`, () => {
        if (+this.priceMax.value <= +this.priceMin.value) {
          this.priceMax.value = this.priceMin.value;
        }
      });

      this.priceMin.addEventListener('keydown', (event) => {
        this._pressOnlyNumbers(event);
      });
      this.priceMax.addEventListener('keydown', (event) => {
        this._pressOnlyNumbers(event);
      });
    }

    // применение фильтров
    _setFilteredGuitars() {
      const filterData = {};
      filterData.type = [];
      filterData.strings = [];
      filterData.priceMin = this.priceMin.value;
      filterData.priceMax = this.priceMax.value;
      this.containerFilterType.querySelectorAll(`.filter__input`).forEach((item) => {
        if (item.checked) {
          filterData.type.push(item.value);
        }
      });
      this.containerFilterNum.querySelectorAll(`.filter__input`).forEach((item) => {
        if (item.checked) {
          filterData.strings.push(+item.value);
        }
      });
      this.store.setFilters(filterData);
    }

    // заполение минимального и максимального значений цены
    _renderPrice() {
      this.priceMin.value = this.store.getFiltersValue().priceMin;
      this.priceMax.value = this.store.getFiltersValue().priceMax;
      this._priceFilterValid();
    }

    // отрисовка карточек
    _renderGuitars() {
      this.view.renderCards(this.store.getFilteredGuitars().slice(0, 9), this._addCardInBasket);
      this._renderPageItems(this.store.getFilteredGuitars());
    }
  }

  class StoreBasket {
    constructor(guitars) {
      this.guitars = guitars;
    }

    getGuitars() {
      return this.guitars;
    }

    setGuitars(guitars) {
      this.guitars = guitars;
    }

    addGuitar(guitar) {
      if (this.guitars[guitar.id]) {
        this.guitars[guitar.id].count++;
      } else {
        guitar.count = 1;
        this.guitars[guitar.id] = guitar;
      }
    }

    deleteGuitar(id, all) {
      if (all === true) {
        delete this.guitars[id];
      } else if (all === false && this.guitars[id].count >= 2) {
        this.guitars[id].count--;
      } else {
        delete this.guitars[id];
      }
    }
  }

  class ViewBasket {
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
      clone.querySelector(`.guitar__img`).src = guitar.img;
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
          clickHandler1(evt, guitar.id, false);
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
      clone.querySelector(`.popup__img`).src = guitar.img;
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
        clickhandler(evt, guitar.id, true);
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

  class PresenterBasket {
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
      if (quantity === 0) {
        buttonIndicator.textContent = ``;
      } else {
        buttonIndicator.textContent = quantity;
      }
    }

    _initPromo() {
      const form = document.querySelector(`.basket__code-wrapper`);
      const code = document.querySelector(`.basket__code`);
      form.addEventListener(`submit`, (evt) => {
        this._code = code.value;
        this._codeCheck(evt, this._code);
        code.value = ``;
      });
    }

    _renderBasketGuitars() {
      this.view.renderBasketCards(Object.values(this.store.getGuitars()), this._deleteGuitar, this._addGuitar);
    }

    _deleteGuitar(evt, id, all) {
      this.store.deleteGuitar(id, all);
      this._renderBasketGuitars();
      this.api.deleteGuitar(id, all);
      this._getAllPrice();
      this._codeCheck(evt, this._code);
      this._getNumberGuitars();
    }

    _addGuitar(evt, guitar) {
      this.store.addGuitar(guitar);
      this._renderBasketGuitars();
      this.api.addCardInBasket(guitar);
      this._getAllPrice();
      this._codeCheck(evt, this._code);
      this._getNumberGuitars();
    }

    _getAllPrice() {
      const allPrice = document.querySelector(`.basket__all-price`);
      const priceItems = document.querySelectorAll(`.guitar__full-price-content`);
      allPrice.textContent = ``;
      priceItems.forEach((item) => {
        allPrice.textContent = Number(allPrice.textContent) + Number(item.textContent);
      });
    }

    _codeCheck(evt, code) {
      evt.preventDefault();
      const allPrice = document.querySelector(`.basket__all-price`);
      const button = document.querySelector(`.basket__code-submit`);
      if (code === `GITARAHIT`) {
        allPrice.textContent = (Number(allPrice.textContent) * 90) / 100;
        button.disabled = true;
      } else if (code === `SUPERGITARA`) {
        if (Number(allPrice.textContent) >= 700) {
          allPrice.textContent = Number(allPrice.textContent) - 700;
        } else {
          allPrice.textContent = 0;
        }
        button.disabled = true;
      } else if (code === `GITARA2020`) {
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

  if (localStorage.getItem(`guitarsBasket`) === null) {
    localStorage.setItem(`guitarsBasket`, JSON.stringify({data: {}}));
  }

  const api = new API(`/js/data.json`);

  if (window.location.pathname === `/basket.html`) {
    const basketStore = new StoreBasket(api.getCardsBasket());
    const basketView = new ViewBasket();
    const basketPresenter = new PresenterBasket(basketStore, basketView, api);
    basketPresenter.init();
  } else {
    api.getCards().then((cards) => {
      const myStore = new Store(cards);
      const myView = new View();
      const myPresenter = new Presenter(myStore, myView, api);
      myPresenter.init();
    });
  }

}());

//# sourceMappingURL=main.js.map
