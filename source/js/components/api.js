const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const toJSON = (response) => {
  return response.json();
};

export default class API {
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
      dataBasket.data[guitar.id].count++
    } else {
      guitar.count = 1;
      dataBasket.data[guitar.id] = guitar;
    }
    localStorage.setItem(`guitarsBasket`, JSON.stringify(dataBasket));
  }

  deleteGuitar(id, all) {
    const dataBasket = JSON.parse(localStorage.getItem(`guitarsBasket`));
    if (all === true) {
      delete dataBasket.data[id]
    } else if (all === false && dataBasket.data[id].count >= 2) {
      dataBasket.data[id].count--
    } else {
      delete dataBasket.data[id]
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
