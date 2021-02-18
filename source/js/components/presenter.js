import StoreBasket from './store-basket';

export default class Presenter {
  constructor(store, view, api) {
    this.store = store;
    this.view = view;
    this.api = api;
    this.basketItems = this.api.getCardsBasket();
    this._clickFilterItemTypes = this._clickFilterItemTypes.bind(this);
    this._clickFilterItemStrings = this._clickFilterItemStrings.bind(this);
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
    const basket = new StoreBasket(this.basketItems);
    basket.addGuitar(guitar);
    this.api.setCardsBasket(basket.getGuitars());
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
    if (this.containerFilterType) {
      this._renderFilterItems(this.store.getFiltersValue().type, this.containerFilterType, `types`);
    }
    if (this.containerFilterNum) {
      this._renderFilterItems(this.store.getFiltersValue().strings, this.containerFilterNum, `numbers`);
    }
    this._renderPrice();
    this._buttonsListner();
  }

  // получение колличества гитар в корзине
  _getNumberGuitars() {
    const buttonIndicator = document.querySelector(`.header__button-indicator`);
    let quantity = null;
    Object.values(this.basketItems).forEach((item) => {
      quantity = quantity + item.count;
    });
    if (buttonIndicator && quantity === 0) {
      buttonIndicator.textContent = ``;
    } else if (buttonIndicator) {
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
    if (this.buttonSortPrice) {
      this.buttonSortPrice.addEventListener(`click`, () => {
        this._changeButtonsStates(this.buttonSortPrice, `sort__button-type`);
        this._sortCardsByPrice();
      });
    }
    if (this.buttonSortPopularity) {
      this.buttonSortPopularity.addEventListener(`click`, () => {
        this._changeButtonsStates(this.buttonSortPopularity, `sort__button-type`);
        this._sortCardsByPopularity();
      });
    }
    if (this.buttonSortMin) {
      this.buttonSortMin.addEventListener(`click`, () => {
        this._changeButtonsStates(this.buttonSortMin, `sort__button`);
        this._sortCardsMinMax(`min`);
      });
    }
    if (this.buttonSortMax) {
      this.buttonSortMax.addEventListener(`click`, () => {
        this._changeButtonsStates(this.buttonSortMax, `sort__button`);
        this._sortCardsMinMax(`max`);
      });
    }
    if (this.priceMin) {
      this.priceMin.addEventListener(`blur`, () => {
        this._getFilteredGuitars();
        this._clickFilterItemStrings();
        this._clickFilterItemTypes();
      });
    }
    if (this.priceMax) {
      this.priceMax.addEventListener(`blur`, () => {
        this._getFilteredGuitars();
        this._clickFilterItemStrings();
        this._clickFilterItemTypes();
      });
    }
    if (this.buttonNextPage) {
      this.buttonNextPage.addEventListener(`click`, () => {
        this._getNextPage();
      });
    }
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
    this.view.renderCards(this.store.getSortPrice().slice(0, 9), this._addCardInBasket);
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
    this.view.renderCards(this.store.getSortPopularity().slice(0, 9), this._addCardInBasket);
    this._currentData = this.store.getSortPopularity();
    this._renderPageItems(this._currentData);
  }

  // сортировка от меньшего к большему и наоборот
  _sortCardsMinMax(value) {
    if ((!this.buttonSortPrice.classList.contains(`sort__button-type_active`) && !this.buttonSortPopularity.classList.contains(`sort__button-type_active`)) || this.buttonSortPrice.classList.contains(`sort__button-type_active`)) {
      this.buttonSortPrice.classList.add(`sort__button-type_active`);
      this.store.setSortPrice(value);
      this.view.renderCards(this.store.getSortPrice().slice(0, 9), this._addCardInBasket);
      this._currentData = this.store.getSortPrice();
      this._renderPageItems(this._currentData);
    } else if (this.buttonSortPopularity.classList.contains(`sort__button-type_active`)) {
      this.store.setSortPopularity(value);
      this.view.renderCards(this.store.getSortPopularity().slice(0, 9), this._addCardInBasket);
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
  _clickFilterItemTypes() {
    this._setFilteredGuitars();
    const typeGuitars = this.store.getTypesGuitarArray(this.store.getFilteredGuitarsStrings());
    const typeGuitarsAll = document.querySelectorAll(`[name="types"]`);

    typeGuitarsAll.forEach((item) => {
      item.disabled = true;
    });
    typeGuitars.forEach((item) => {
      typeGuitarsAll.forEach((item2) => {
        if (item === item2.value) {
          item2.disabled = false;
        }
      });
    });
  }

    // валидация фильтра по количеству струн
    _clickFilterItemStrings() {
      this._setFilteredGuitars();
      const typeGuitars = this.store.getStringsGuitarArray(this.store.getFilteredGuitarsTypes());
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
    this.view.renderFilterItems(filter, container, name, this._clickFilterItemStrings, this._getFilteredGuitars, this._clickFilterItemTypes);
  }

  // валидация фильтров по цене
  _priceFilterValid() {
    if (this.priceMin) {
      this.priceMin.addEventListener(`blur`, () => {
        if (+this.priceMin.value < +this.store.getMinGuitarsPrice()) {
          this.priceMin.value = this.store.getMinGuitarsPrice();
        } else if (+this.priceMin.value >= +this.priceMax.value) {
          this.priceMin.value = this.priceMax.value;
        }
      });
    }
    if (this.priceMax) {
      this.priceMax.addEventListener(`blur`, () => {
        if (+this.priceMax.value <= +this.priceMin.value) {
          this.priceMax.value = this.priceMin.value;
        }
      });
    }
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
    if (this.priceMin) {
      this.priceMin.value = this.store.getFiltersValue().priceMin;
    }
    if (this.priceMax) {
      this.priceMax.value = this.store.getFiltersValue().priceMax;
    }
    this._priceFilterValid();
  }

  // отрисовка карточек
  _renderGuitars() {
    this.view.renderCards(this.store.getFilteredGuitars().slice(0, 9), this._addCardInBasket);
    this._renderPageItems(this.store.getFilteredGuitars());
  }
}
