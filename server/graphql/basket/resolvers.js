import axios from 'axios';
import queryString from 'querystring';

const getBaskets = (filters) => {
  const qs = queryString.stringify(filters);

  return axios.get(`http://localhost:4000/baskets?${qs}`);
};

const getBasketById = (id) => {
  return axios.get(`http://localhost:4000/baskets/${id}`);
};

const getBasketProductsById = (id) => {
  return axios.get(`http://localhost:4000/baskets/${id}/products`);
};

export default {
  getBaskets,
  getBasketById,
  getBasketProductsById 
}