import axios from 'axios';
import queryString from 'querystring';

const getProducts = (filters) => {
  const qs = queryString.stringify(filters);

  return axios.get(`http://localhost:4000/products?${qs}`);
};

const getProductById = (id) => {
  return axios.get(`http://localhost:4000/products/${id}`);
};

export default {
  getProducts,
  getProductById  
}