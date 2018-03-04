import currencyTypes from './types';
import currencyResolvers from './resolvers';
// import currencyMutations from './mutations';

export const types = {
  ...currencyTypes
}

export const resolvers = {
  ...currencyResolvers
};

export const mutations = {
  // ...currencyMutations
};

export default {
  types,
  resolvers,
  mutations
}