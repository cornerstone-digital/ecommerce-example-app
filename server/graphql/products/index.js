import productTypes from './types';
import productResolvers from './resolvers';

export const types = {
  ...productTypes
}

export const resolvers = {
  ...productResolvers
};

export const mutations = {

};

export default {
  types,
  resolvers,
  mutations
}