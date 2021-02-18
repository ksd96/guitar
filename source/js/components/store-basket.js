export default class StoreBasket {
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
    if (this.guitars[guitar.article]) {
      this.guitars[guitar.article].count++;
    } else {
      guitar.count = 1;
      this.guitars[guitar.article] = guitar;
    }
  }

  deleteGuitar(article, all) {
    if (all === true) {
      delete this.guitars[article];
    } else if (all === false && this.guitars[article].count >= 2) {
      this.guitars[article].count--;
    } else {
      delete this.guitars[article];
    }
  }
}
