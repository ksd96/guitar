export default class Store {
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
