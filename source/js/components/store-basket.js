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
    if (this.guitars[guitar.id]) {
      this.guitars[guitar.id].count++
    } else {
      guitar.count = 1;
      this.guitars[guitar.id] = guitar;
    }
  }

  deleteGuitar(id, all) {
    if (all === true) {
      delete this.guitars[id];
    } else if (all === false && this.guitars[id].count >= 2) {
      this.guitars[id].count--
    } else {
      delete this.guitars[id];
    }
  }
}
