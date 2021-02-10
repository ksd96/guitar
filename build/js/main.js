(function () {
  'use strict';

  const dataItems = {
    "1": {
      "id": 1,
      "article": "SO757575",
      "name": "Честер Bass",
      "type": "Электрогитары",
      "popularity": 15,
      "strings": 7,
      "price": 17500,
      "img": "./img/electro1.png"
    },
    "2": {
      "id": 2,
      "article": "TK129049",
      "name": "СURT Z300",
      "type": "Электрогитары",
      "popularity": 9,
      "strings": 7,
      "price": 29500,
      "img": "./img/electro2.png"
    },
    "3": {
      "id": 3,
      "article": "RO111111",
      "name": "Roman LX",
      "type": "Укулеле",
      "popularity": 21,
      "strings": 4,
      "price": 6800,
      "img": "./img/ukulele.png"
    },
    "4": {
      "id": 4,
      "article": "TK436457",
      "name": "СURT T300",
      "type": "Электрогитары",
      "popularity": 15,
      "strings": 6,
      "price": 30000,
      "img": "./img/electro1.png"
    },
    "5": {
      "id": 5,
      "article": "DI192138",
      "name": "Dania Super",
      "type": "Акустические гитары",
      "popularity": 5,
      "strings": 7,
      "price": 3500,
      "img": "./img/acoustic.png"
    },
    "6": {
      "id": 6,
      "article": "SO934345",
      "name": "Честер WX",
      "type": "Электрогитары",
      "popularity": 17,
      "strings": 6,
      "price": 15300,
      "img": "./img/electro3.png"
    },
    "7": {
      "id": 7,
      "article": "DI082347",
      "name": "Dania VX",
      "type": "Укулеле",
      "popularity": 5,
      "strings": 4,
      "price": 2200,
      "img": "./img/ukulele.png"
    },
    "8": {
      "id": 8,
      "article": "SO135646",
      "name": "Честер Plus",
      "type": "Электрогитары",
      "popularity": 27,
      "strings": 4,
      "price": 30000,
      "img": "./img/electro2.png"
    },
    "9": {
      "id": 9,
      "article": "VO154751",
      "name": "Виолана 300",
      "type": "Акустические гитары",
      "popularity": 3,
      "strings": 7,
      "price": 1700,
      "img": "./img/acoustic.png"
    },
    "10": {
      "id": 10,
      "article": "TK244556",
      "name": "СURT Clasic",
      "type": "Электрогитары",
      "popularity": 20,
      "strings": 4,
      "price": 23000,
      "img": "./img/electro4.png"
    },
    "11": {
      "id": 11,
      "article": "TK134663",
      "name": "СURT Z250",
      "type": "Электрогитары",
      "popularity": 19,
      "strings": 4,
      "price": 18700,
      "img": "./img/electro1.png"
    },
    "12": {
      "id": 12,
      "article": "SO123212",
      "name": "Честер 7X",
      "type": "Электрогитары",
      "popularity": 30,
      "strings": 7,
      "price": 35000,
      "img": "./img/electro3.png"
    },
    "13": {
      "id": 13,
      "article": "SO123234",
      "name": "Честер 6V",
      "type": "Электрогитары",
      "popularity": 28,
      "strings": 6,
      "price": 14900,
      "img": "./img/electro4.png"
    },
    "14": {
      "id": 14,
      "article": "VO519510",
      "name": "Виолана Mix",
      "type": "Акустические гитары",
      "popularity": 7,
      "strings": 6,
      "price": 7600,
      "img": "./img/acoustic.png"
    },
    "15": {
      "id": 15,
      "article": "VO457369",
      "name": "Виолана 250x",
      "type": "Акустические гитары",
      "popularity": 19,
      "strings": 6,
      "price": 6500,
      "img": "./img/acoustic.png"
    },
    "16": {
      "id": 16,
      "article": "FB625903",
      "name": "Фабио Лайт",
      "type": "Акустические гитары",
      "popularity": 26,
      "strings": 7,
      "price": 12000,
      "img": "./img/acoustic.png"
    },
    "17": {
      "id": 17,
      "article": "FB576948",
      "name": "Фабио L100",
      "type": "Акустические гитары",
      "popularity": 31,
      "strings": 7,
      "price": 9900,
      "img": "./img/acoustic.png"
    },
    "18": {
      "id": 18,
      "article": "LU012032",
      "name": "Liana Z200",
      "type": "Акустические гитары",
      "popularity": 28,
      "strings": 12,
      "price": 8900,
      "img": "./img/acoustic.png"
    },
    "19": {
      "id": 19,
      "article": "LU546853",
      "name": "Liana Z100",
      "type": "Акустические гитары",
      "popularity": 34,
      "strings": 12,
      "price": 10500,
      "img": "./img/acoustic.png"
    },
    "20": {
      "id": 20,
      "article": "LU458283",
      "name": "Liana Z300",
      "type": "Акустические гитары",
      "popularity": 9,
      "strings": 6,
      "price": 13300,
      "img": "./img/acoustic.png"
    },
    "21": {
      "id": 21,
      "article": "RO324341",
      "name": "Roman RX",
      "type": "Укулеле",
      "popularity": 38,
      "strings": 4,
      "price": 4800,
      "img": "./img/ukulele.png"
    },
    "22": {
      "id": 22,
      "article": "RO214235",
      "name": "Roman TX",
      "type": "Укулеле",
      "popularity": 5,
      "strings": 4,
      "price": 1900,
      "img": "./img/ukulele.png"
    },
    "23": {
      "id": 23,
      "article": "DI132414",
      "name": "Dania U100",
      "type": "Укулеле",
      "popularity": 23,
      "strings": 4,
      "price": 2500,
      "img": "./img/ukulele.png"
    },
    "24": {
      "id": 24,
      "article": "DI934754",
      "name": "Dania WR",
      "type": "Укулеле",
      "popularity": 3,
      "strings": 4,
      "price": 3800,
      "img": "./img/ukulele.png"
    },
    "25": {
      "id": 25,
      "article": "DI034292",
      "name": "Dania LE",
      "type": "Укулеле",
      "popularity": 10,
      "strings": 4,
      "price": 4100,
      "img": "./img/ukulele.png"
    },
    "26": {
      "id": 26,
      "article": "MI193214",
      "name": "Mirana V10",
      "type": "Укулеле",
      "popularity": 14,
      "strings": 4,
      "price": 2700,
      "img": "./img/ukulele.png"
    },
    "27": {
      "id": 27,
      "article": "VO043244",
      "name": "MВиолана Mini",
      "type": "Укулеле",
      "popularity": 29,
      "strings": 4,
      "price": 6700,
      "img": "./img/ukulele.png"
    }
  };

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
    _getGuitarCard(guitar) {
      const template = document.querySelector(`#cardTemplate`);
      const clone = template.content.cloneNode(true);
      clone.querySelector(`.card__title`).textContent = guitar.name;
      clone.querySelector(`.card__price`).textContent = guitar.price;
      clone.querySelector(`.card__rating`).textContent = guitar.popularity;
      clone.querySelector(`.card__image`).src = guitar.img;
      return clone;
    }

    // получение элемента фильтра
    _getFilterItemType(filter, name, clickHandler) {
      const template = document.querySelector(`#filterItemTemplate`);
      const clone = template.content.cloneNode(true);
      clone.querySelector(`.filter__name`).textContent = filter;
      clone.querySelector(`.filter__input`).name = name;
      clone.querySelector(`.filter__input`).value = filter;
      if (name === `types`) {
        clone.querySelector(`.filter__input`).addEventListener(`click`, () => {
          if (clickHandler) {
            clickHandler();
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
    renderFilterItems(filter, container, name, clickHandler) {
      while (container.firstChild) {
        container.removeChild(container.lastChild);
      }

      filter.forEach((item) => {
        const card = this._getFilterItemType(item, name, clickHandler);
        container.appendChild(card);
      });
    }

    // отрисовка карточки гитары
    renderCards(guitars) {
      const container = document.querySelector('.cards__list');

      // очищаем
      while (container.firstChild) {
        container.removeChild(container.lastChild);
      }

      // рисуем новые карточки
      guitars.forEach((guitar) => {
        const card = this._getGuitarCard(guitar);
        container.appendChild(card);
      });
    }

    // отрисовка кнопки пагинации
    renderPageButton(numbers, clickHandler) {
      const container = document.querySelector('.pages__list');

      // очищаем
      while (container.firstChild) {
        container.removeChild(container.lastChild);
      }

      // рисуем новые карточки
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
    constructor(store, view) {
      this.store = store;
      this.view = view;
      this.buttonSortPrice = document.querySelector(`.sort__button-type_type_price`);
      this.buttonSortPopularity = document.querySelector(`.sort__button-type_type_popularity`);
      this.buttonSortMin = document.querySelector(`.sort__button_type_min`);
      this.buttonSortMax = document.querySelector(`.sort__button_type_max`);
      this.containerFilterType = document.querySelector(`.filter__list_type`);
      this.containerFilterNum = document.querySelector(`.filter__list_numbers`);
      this.priceMin = document.querySelector(`.filter__price-input_type_min`);
      this.priceMax = document.querySelector(`.filter__price-input_type_max`);
      this.buttonSubmit = document.querySelector(`.filter__submit`);
      this._renderPageNumberCards = this._renderPageNumberCards.bind(this);
      this._currentData = this.store.getFilteredGuitars();
      this.buttonNextPage = document.querySelector(`.pages__button-next`);
      this._clickFilterItem = this._clickFilterItem.bind(this);
    }

    init() {
      this._renderGuitars();
      this._buttonsListner();
      this._renderFilterItems(this.store.getFiltersValue().type, this.containerFilterType, `types`);
      this._renderFilterItems(this.store.getFiltersValue().strings, this.containerFilterNum, `numbers`);
      this._renderPrice();
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
      this.buttonSubmit.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._getFilteredGuitars(evt);
        this._currentData = this.store.getFilteredGuitars();
        this._renderGuitars();
      });
      this.buttonNextPage.addEventListener(`click`, () => {
        this._getNextPage();
      });
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
      this._getFilteredGuitars();
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
      this.view.renderFilterItems(filter, container, name, this._clickFilterItem);
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

    // отрисовка отфильтрованных карточек
    _getFilteredGuitars() {
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
      this.view.renderCards(this.store.getFilteredGuitars().slice(0, 9));
      this._renderPageItems(this.store.getFilteredGuitars());
    }

  }

  const myStore = new Store(dataItems);
  const myView = new View();
  const myPresenter = new Presenter(myStore, myView);

  myPresenter.init();

}());

//# sourceMappingURL=main.js.map
