import axios from 'axios';
import queryString from 'querystring';

const getCurrencies = (filters) => {
  const qs = queryString.stringify(filters);

  return axios.get(`http://localhost:4000/currencies?${qs}`);
};

const getCurrencyById = (id) => {
  return axios.get(`http://localhost:4000/currencies/${id}`);
};

export default {
  getCurrencies,
  getCurrencyById  
}