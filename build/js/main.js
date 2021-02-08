(function () {
  'use strict';

  const dataItems = {
    "1": {
      "id": 1,
      "article": "SO757575",
      "name": "Честер Bass",
      "type": "electro",
      "popularity": 15,
      "strings": 7,
      "price": 17500
    },
    "2": {
      "id": 2,
      "article": "TK129049",
      "name": "СURT Z300",
      "type": "electro",
      "popularity": 9,
      "strings": 7,
      "price": 29500
    },
    "3": {
      "id": 3,
      "article": "RO111111",
      "name": "Roman LX",
      "type": "ukulele",
      "popularity": 21,
      "strings": 4,
      "price": 6800
    },
    "4": {
      "id": 4,
      "article": "TK436457",
      "name": "СURT T300",
      "type": "electro",
      "popularity": 15,
      "strings": 6,
      "price": 30000
    },
    "5": {
      "id": 5,
      "article": "DI192138",
      "name": "Dania Super",
      "type": "acoustic",
      "popularity": 5,
      "strings": 7,
      "price": 3500
    },
    "6": {
      "id": 6,
      "article": "SO934345",
      "name": "Честер WX",
      "type": "electro",
      "popularity": 17,
      "strings": 6,
      "price": 15300
    },
    "7": {
      "id": 7,
      "article": "DI082347",
      "name": "Dania VX",
      "type": "ukulele",
      "popularity": 5,
      "strings": 4,
      "price": 2200
    },
    "8": {
      "id": 8,
      "article": "SO135646",
      "name": "Честер Plus",
      "type": "electro",
      "popularity": 27,
      "strings": 4,
      "price": 30000
    },
    "9": {
      "id": 9,
      "article": "VO154751",
      "name": "Виолана 300",
      "type": "acoustic",
      "popularity": 3,
      "strings": 7,
      "price": 1700
    },
    "10": {
      "id": 10,
      "article": "TK244556",
      "name": "СURT Clasic",
      "type": "electro",
      "popularity": 20,
      "strings": 4,
      "price": 23000
    },
    "11": {
      "id": 11,
      "article": "TK134663",
      "name": "СURT Z250",
      "type": "electro",
      "popularity": 19,
      "strings": 4,
      "price": 18700
    },
    "12": {
      "id": 12,
      "article": "SO123212",
      "name": "Честер 7X",
      "type": "electro",
      "popularity": 30,
      "strings": 7,
      "price": 35000
    },
    "13": {
      "id": 13,
      "article": "SO123234",
      "name": "Честер 6V",
      "type": "electro",
      "popularity": 28,
      "strings": 6,
      "price": 14900
    },
    "14": {
      "id": 14,
      "article": "VO519510",
      "name": "Виолана Mix",
      "type": "acoustic",
      "popularity": 7,
      "strings": 6,
      "price": 7600
    },
    "15": {
      "id": 15,
      "article": "VO457369",
      "name": "Виолана 250x",
      "type": "acoustic",
      "popularity": 19,
      "strings": 6,
      "price": 6500
    },
    "16": {
      "id": 16,
      "article": "FB625903",
      "name": "Фабио Лайт",
      "type": "acoustic",
      "popularity": 26,
      "strings": 7,
      "price": 12000
    },
    "17": {
      "id": 17,
      "article": "FB576948",
      "name": "Фабио L100",
      "type": "acoustic",
      "popularity": 31,
      "strings": 7,
      "price": 9900
    },
    "18": {
      "id": 18,
      "article": "LU012032",
      "name": "Liana Z200",
      "type": "acoustic",
      "popularity": 28,
      "strings": 12,
      "price": 8900
    },
    "19": {
      "id": 19,
      "article": "LU546853",
      "name": "Liana Z100",
      "type": "acoustic",
      "popularity": 34,
      "strings": 12,
      "price": 10500
    },
    "20": {
      "id": 20,
      "article": "LU458283",
      "name": "Liana Z300",
      "type": "acoustic",
      "popularity": 9,
      "strings": 6,
      "price": 13300
    },
    "21": {
      "id": 21,
      "article": "RO324341",
      "name": "Roman RX",
      "type": "ukulele",
      "popularity": 38,
      "strings": 4,
      "price": 4800
    },
    "22": {
      "id": 22,
      "article": "RO214235",
      "name": "Roman TX",
      "type": "ukulele",
      "popularity": 5,
      "strings": 4,
      "price": 1900
    },
    "23": {
      "id": 23,
      "article": "DI132414",
      "name": "Dania U100",
      "type": "ukulele",
      "popularity": 23,
      "strings": 4,
      "price": 2500
    },
    "24": {
      "id": 24,
      "article": "DI934754",
      "name": "Dania WR",
      "type": "ukulele",
      "popularity": 3,
      "strings": 4,
      "price": 3800
    },
    "25": {
      "id": 25,
      "article": "DI034292",
      "name": "Dania LE",
      "type": "ukulele",
      "popularity": 10,
      "strings": 4,
      "price": 4100
    },
    "26": {
      "id": 26,
      "article": "MI193214",
      "name": "Mirana V10",
      "type": "ukulele",
      "popularity": 14,
      "strings": 4,
      "price": 2700
    },
    "27": {
      "id": 27,
      "article": "VO043244",
      "name": "MВиолана Mini",
      "type": "ukulele",
      "popularity": 29,
      "strings": 4,
      "price": 6700
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
        priceMiax: this.filters.price.max,
      };

      return filters;
    }

    // отдает существующие типы гитар
    getTypesGuitar() {
      const types = Object.values(this.guitars).map((guitar) => guitar.type);
      return new Set(types);
    }

    // отдает существующие типы гитар по колличеству струн
    getStringsGuitar() {
      const strings = Object.values(this.guitars).map((guitar) => guitar.strings);
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
    _getGuitarCard(guitar) {
      const template = document.querySelector('#cardTemplate');
      const clone = template.content.cloneNode(true);
      clone.querySelector('.card__title').textContent = guitar.name;
      clone.querySelector('.card__price').textContent = guitar.price;
      clone.querySelector('.card__rating').textContent = guitar.popularity;
      return clone;
    }

    // _getFilterItemType(filter) {
    //   const template = document.querySelector(`#filterItemTemplate`);
    //   const clone = template.content.cloneNode(true);
    //   clone.querySelector('.filter__name').textContent = filter;
    //   return clone;
    // }

    // renderFilterNumbers(filter) {
    //   const container = document.querySelector(`.filter__list_numbers`);

    //   while (container.firstChild) {
    //     container.removeChild(container.lastChild);
    //   }

    //   filter.forEach((item) => {
    //     const card = this._getFilterItemType(item);
    //     container.appendChild(card);
    //   });
    // }

    // renderFilterType(filter) {
    //   const container = document.querySelector(`.filter__list_type`);

    //   while (container.firstChild) {
    //     container.removeChild(container.lastChild);
    //   }

    //   filter.forEach((item) => {
    //     const card = this._getFilterItemType(item);
    //     container.appendChild(card);
    //   });
    // }

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
  }

  class Presenter {
    constructor(store, view) {
      this.store = store;
      this.view = view;
      this.buttonSortPrice = document.querySelector(`.sort__button-type_type_price`);
      this.buttonSortPopularity = document.querySelector(`.sort__button-type_type_popularity`);
      this.buttonSortMin = document.querySelector(`.sort__button_type_min`);
      this.buttonSortMax = document.querySelector(`.sort__button_type_max`);
    }

    init() {
      this.renderGuitars();
      this.buttonsListner();
      // this.renderFilterType();
      // this.renderFilterNumbers();
    }

    buttonsListner() {
      this.buttonSortPrice.addEventListener(`click`, () => {
        this.changeButtonsStates(this.buttonSortPrice, `sort__button-type`);
        this.sortCardsByPrice();
      });
      this.buttonSortPopularity.addEventListener(`click`, () => {
        this.changeButtonsStates(this.buttonSortPopularity, `sort__button-type`);
        this.sortCardsByTPopularity();
      });
      this.buttonSortMin.addEventListener(`click`, () => {
        this.changeButtonsStates(this.buttonSortMin, `sort__button`);
        this.sortCardsMinMax(`min`);
      });
      this.buttonSortMax.addEventListener(`click`, () => {
        this.changeButtonsStates(this.buttonSortMax, `sort__button`);
        this.sortCardsMinMax(`max`);
      });
    }

    sortCardsByPrice() {
      if (!this.buttonSortMin.classList.contains(`sort__button_active`) && !this.buttonSortMax.classList.contains(`sort__button_active`)) {
        this.buttonSortMin.classList.add(`sort__button_active`);
        this.store.setSortPrice(`min`);
      } else if (this.buttonSortMin.classList.contains(`sort__button_active`)) {
        this.store.setSortPrice(`min`);
      } else if (this.buttonSortMax.classList.contains(`sort__button_active`)) {
        this.store.setSortPrice(`max`);
      }
      this.view.renderCards(this.store.getSortPrice());
    }

    sortCardsByTPopularity() {
      if (!this.buttonSortMin.classList.contains(`sort__button_active`) && !this.buttonSortMax.classList.contains(`sort__button_active`)) {
        this.buttonSortMin.classList.add(`sort__button_active`);
        this.store.setSortPopularity(`min`);
      } else if (this.buttonSortMin.classList.contains(`sort__button_active`)) {
        this.store.setSortPopularity(`min`);
      } else if (this.buttonSortMax.classList.contains(`sort__button_active`)) {
        this.store.setSortPopularity(`max`);
      }
      this.view.renderCards(this.store.getSortPopularity());
    }

    sortCardsMinMax(value) {
      if ((!this.buttonSortPrice.classList.contains(`sort__button-type_active`) && !this.buttonSortPopularity.classList.contains(`sort__button-type_active`)) || this.buttonSortPrice.classList.contains(`sort__button-type_active`)) {
        this.buttonSortPrice.classList.add(`sort__button-type_active`);
        this.store.setSortPrice(value);
        this.view.renderCards(this.store.getSortPrice());
      } else if (this.buttonSortPopularity.classList.contains(`sort__button-type_active`)) {
        this.store.setSortPopularity(value);
        this.view.renderCards(this.store.getSortPopularity());
      }
    }

    changeButtonsStates(item, name) {
      const buttons = document.querySelectorAll(`.${name}_active`);
      buttons.forEach((button) => {
        button.classList.remove(`${name}_active`);
      });
      item.classList.add(`${name}_active`);
    }

    // renderFilterType() {
    //   this.view.renderFilterType(this.store.getFiltersValue().type);
    // }

    // renderFilterNumbers() {
    //   this.view.renderFilterNumbers(this.store.getFiltersValue().strings);
    // }

    renderGuitars() {
      this.view.renderCards(this.store.getFilteredGuitars());
    }

  }

  const myStore = new Store(dataItems);
  const myView = new View();
  const myPresenter = new Presenter(myStore, myView);

  myPresenter.init();

}());

//# sourceMappingURL=main.js.map
