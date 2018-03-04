import axios from 'axios';
import queryString from 'querystring';

const getBaskets = (filters) => {
  const qs = queryString.stringify(filters);

  return axios.get(`http://localhost:4000/baskets?${qs}`);
};

const getBasketById = (id) => {
  return axios.get(`http://localhost:4000/baskets/${id}`);
};

const getBasketItemsByBasketId = (basketId) => {
  return axios.get(`http://localhost:4000/basketItems?basketId=${basketId}`);
};

const getBasketItemByProductId = (basketId, productId) => {
  return axios.get(`http://localhost:4000/basketItems?basketId=${basketId}&productId=${productId}`);  
};

export default {
  getBaskets,
  getBasketById,
  getBasketItemsByBasketId,
  getBasketItemByProductId
}