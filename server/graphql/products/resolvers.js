import axios from 'axios';
import queryString from 'querystring';

const getProducts = (filters) => {
  return axios.get(`http://localhost:4000/products?${queryString.stringify(filters)}`);
};

const getProductById = (id) => {
  return axios.get(`http://localhost:4000/products/${id}`);
};

export default {
  getProducts,
  getProductById  
}