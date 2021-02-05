import dataItems from './data';

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
