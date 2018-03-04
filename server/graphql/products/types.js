import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat
} from 'graphql';

import { 
  types as currencyTypes,
  resolvers as currencyResolvers
} from '../currencies';

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    currency: { 
      type: currencyTypes.CurrencyType,
      resolve(parentValue, args) {
        return currencyResolvers.getCurrencyById(parentValue.currencyId)
          .then( response => response.data );
      }
    }
  })
});

export default {
  ProductType  
}