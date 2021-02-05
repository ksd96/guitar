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
    }

    getFilters() {
      const filters = {
        type: this.filters.type,
        strings: this.filters.strings,
        priceMin: this.filters.price.min,
        priceMiax: this.filters.price.max,
      };

      return filters;
    }

    getTypesGuitar() {
      const types = Object.values(this.guitars).map((guitar) => guitar.type);
      return new Set(types);
    }

    getStringsGuitar() {
      const strings = Object.values(this.guitars).map((guitar) => guitar.strings);
      return new Set(strings);
    }

    getMaxGuitarsPrice() {
      const prices = Object.values(this.guitars).map((guitar) => guitar.price);
      return Math.max.apply(null, prices);
    }

    getMinGuitarsPrice() {
  		const prices = Object.values(this.guitars).map((guitar) => guitar.price);
      return Math.min.apply(null, prices);
    }

    sortByType(cards, types) {
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

    sortByStrings(cards, strings) {
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

    sortByPrice(cards, minPrice, maxPrice) {
      const guitars = Object.values(cards).filter((guitar) => guitar.price >= minPrice && guitar.price <= maxPrice);
      return guitars;
    }

    setFilters(objectData) {
      this.filters.type = objectData.type;
      this.filters.strings = objectData.strings;
      this.filters.price.min = objectData.priceMin;
      this.filters.price.max = objectData.priceMax;
    }

    getFilteredGuitars() {
      let filteredCards = this.guitars;
      filteredCards = this.sortByType(filteredCards, this.filters.type);
      filteredCards = this.sortByStrings(filteredCards, this.filters.strings);
      filteredCards = this.sortByPrice(filteredCards, this.filters.price.min, this.filters.price.max);
      return filteredCards;
    }

    getGuitars() {
      return Object.values(this.guitars);
    }
  }

  // class View {
  //   _getGuitarCard(guitar) {
  //     const template = document.querySelector('#cardTemplate');
  //     const clone = template.content.cloneNode(true);
  //     clone.querySelector('.card__title').textContent = guitar.name;
  //     clone.querySelector('.card__price').textContent = guitar.price;
  //     clone.querySelector('.card__rating').textContent = guitar.popularity;
  //     return clone;
  //   }

  //   renderCards(guitars) {

  //     const container = document.querySelector('.main');
  //     // очищаем
  //     // while (container.firstChild) {
  //     //   container.removeChild(container.lastChild);
  //     // }

  //     // рисуем новые карточки
  //     guitars.forEach((guitar) => {
  //       const card = this._getGuitarCard(guitar);
  //       container.appendChild(card);
  //     });
  //   }
  // }

  // class Presenter {
  //   constructor(store, view) {
  //     this.store = store;
  //     this.view = view;
  //   }

  //   init() {
  //     this.renderGuitars();
  //   }

  //   renderGuitars() {
  //     this.view.renderCards(this.store.getGuitars());
  //   }

  // }

  const myStore = new Store(dataItems);
  // const myView = new View();
  // const myPresenter = new Presenter(myStore, myView);
  console.log(myStore.getFilters());
  console.log(myStore.getGuitars());
  myStore.setFilters({type: [], strings: [], priceMin: 5000, priceMax: 20000});
  console.log(myStore.getFilteredGuitars());
  console.log(myStore.getFilters());

  // myPresenter.init();

}());

//# sourceMappingURL=main.js.map
