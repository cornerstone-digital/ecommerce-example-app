import { default as products } from './products';
import { default as basket } from './basket';
import { default as currencies } from './currencies';

const types = {
  ...basket.types,
  ...products.types,
  ...currencies.types  
};

const resolvers = {
  ...basket.resolvers,
  ...products.resolvers,
  ...currencies.resolvers  
};

const mutations = {
  ...basket.mutations,
  ...products.mutations,
  ...currencies.mutations  
};

export default {
  types,
  resolvers,
  mutations
};