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

  // получить содержимое корзины
  getCardsBasket() {
    const cardsBasket = JSON.parse(localStorage.getItem('guitarsBasket'));
    return cardsBasket.data;
  }

  // обновить содержиоме корзины
  setCardsBasket(guitars) {
    const dataBasket = JSON.parse(localStorage.getItem(`guitarsBasket`));
    dataBasket.data = guitars;
    localStorage.setItem(`guitarsBasket`, JSON.stringify(dataBasket));
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    return fetch(url, { method, body, headers});
  }
}
