import axios from 'axios';
import queryString from 'querystring';

export const getProducts = (filters) {
  const qs = queryString.stringify(filters);

  return axios.get(`http://localhost:4000/products?${qs}`)
          .then( response => response.data );
};

export const getProductById = (id) {
  return axios.get(`http://localhost:4000/products/${id}`)
          .then( response => response.data );
};