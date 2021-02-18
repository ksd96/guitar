import API from './components/api';

import Store from './components/store';
import View from './components/view';
import Presenter from './components/presenter';

import StoreBasket from './components/store-basket';
import ViewBasket from './components/view-basket';
import PresenterBasket from './components/presenter-basket';

// нужно для сброса прошлый данных из guitarsBasket
if (localStorage.getItem(`init`) === null) {
  localStorage.setItem(`init`, `ok`);
  localStorage.removeItem(`guitarsBasket`);
}

if (localStorage.getItem(`guitarsBasket`) === null) {
  localStorage.setItem(`guitarsBasket`, JSON.stringify({data: {}}));
}

const api = new API(`/js/data.json`);

if (window.location.pathname === `/basket.html`) {
  const basketStore = new StoreBasket(api.getCardsBasket());
  const basketView = new ViewBasket();
  const basketPresenter = new PresenterBasket(basketStore, basketView, api);
  basketPresenter.init();
} else {
  api.getCards().then((cards) => {
    const myStore = new Store(cards);
    const myView = new View();
    const myPresenter = new Presenter(myStore, myView, api);
    myPresenter.init();
  });
}
