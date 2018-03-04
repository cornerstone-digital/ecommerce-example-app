import axios from "axios";
import uuid from 'uuid';

import basketResolvers from './resolvers';

const createBasket = (basket) => {
  return axios.post('http://localhost:4000/baskets', basket);
};

const deleteBasket = (basketId) => {
  return axios.delete(`http://localhost:4000/baskets/${basketId}`);
};

const addBasketItem = (basketId, productId, quantity) => {
  const basketItem = {
    id: uuid(),
    basketId,
    productId,
    quantity
  };

  return basketResolvers.getBasketItemByProductId(basketId, productId)
    .then(response => response.data)
    .then((basketItems) => {
      console.log(basketItems);
      if (basketItems.length) {
        // Item already in basket, so update basketItem with new quantity
        return updateBasketItemQuantity(basketItems[0].id, basketItems[0].quantity + quantity);
      } else {
        // Not already in basket, so add the item
        return axios.post('http://localhost:4000/basketItems', basketItem);
      }
    });
};

const updateBasketItemQuantity = (basketItemId, quantity) => {
  return axios.patch(`http://localhost:4000/basketItems/${basketItemId}`, { quantity });
};

const removeBasketItem = (basketItemId) => {
  return axios.delete(`http://localhost:4000/basketItems/${basketItemId}`);
};

const changeBasketCurrency = (basketId, currencyId) => {
  return axios.patch(`http://localhost:4000/baskets/${basketId}`, { currencyId });
};

export default {
  createBasket,
  deleteBasket,
  addBasketItem,
  removeBasketItem,
  updateBasketItemQuantity,
  changeBasketCurrency
}