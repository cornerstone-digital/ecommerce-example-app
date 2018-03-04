import basketTypes from './types';
import basketResolvers from './resolvers';
import basketMutations from './mutations';

const types = {
  ...basketTypes
}

const resolvers = {
  ...basketResolvers
};

const mutations = {
  ...basketMutations
};

export default {
  types,
  resolvers,
  mutations
}