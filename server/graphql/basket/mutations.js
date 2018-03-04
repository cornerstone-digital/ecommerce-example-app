import axios from "axios";

const createBasket = (basket) => {
  return axios.post('http://localhost:4000/baskets', basket);
};

const deleteBasket = (basketId) => {
  return axios.delete(`http://localhost:4000/baskets/${basketId}`);
};

const addProductToBasket = (basketId, product, quantity) => {

};

const removeProductFromBasket = (basketId, productId) => {

};

const changeBasketCurrency = (basketId, currencyId) => {

};

export default {
  createBasket,
  deleteBasket,
  addProductToBasket,
  removeProductFromBasket,
  changeBasketCurrency
}