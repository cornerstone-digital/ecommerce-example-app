import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList
} from 'graphql';

import currencyTypes from '../currencies/types';
import productTypes from '../products/types';

import currencyResolvers from '../currencies/resolvers';
import productResolvers from '../products/resolvers';
import basketResolvers from './resolvers';

const BasketType = new GraphQLObjectType({
  name: 'Basket',
  fields: () => ({
    id: { type: GraphQLString},
    currency: { 
      type: currencyTypes.CurrencyType,
      resolve(parentValue, args) {
        return currencyResolvers.getCurrencyById(parentValue.currencyId)
          .then( response => response.data );  
      }
    },
    products: { 
      type: new GraphQLList(productTypes.ProductType),
      resolve(parentValue, args) {
        return basketResolvers.getBasketProductsById(parentValue.id)
          .then( response => response.data ); 
      }
    },
    total: { 
      type: GraphQLFloat,
      resolve(parentValue, args) {
        console.log(parentValue);
        return basketResolvers.getBasketProductsById(parentValue.id)
            .then( response => response.data )
            .then( products => products.reduce((a, b) => {
              return a + b.price;
            }, 0));
      } 
    }
  })
});

export default {
  BasketType
};