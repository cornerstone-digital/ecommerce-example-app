import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt
} from 'graphql';

import queryString from 'querystring';

import currencyTypes from '../currencies/types';
import productTypes from '../products/types';

import currencyResolvers from '../currencies/resolvers';
import productResolvers from '../products/resolvers';
import basketResolvers from './resolvers';

const BasketItemType = new GraphQLObjectType({
  name: 'BasketItem',
  fields: () => ({
    id: { type: GraphQLString },
    product: { 
      type: productTypes.ProductType,
      resolve(parentValue, args) {
        return productResolvers.getProductById(parentValue.productId)
          .then( response => response.data );
      }
    },
    quantity: { type: GraphQLInt },
    lineTotal: { 
      type: GraphQLFloat,
      resolve(parentValue, args) {
        return productResolvers.getProductById(parentValue.productId)
          .then( response => response.data )
          .then((product) => {
            return product.price * parentValue.quantity;
          });
      }
    }
  })
})

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
    items: { 
      type: new GraphQLList(BasketItemType),
      resolve(parentValue, args) {
          return basketResolvers.getBasketItemsByBasketId(parentValue.id)
              .then( response => response.data );
      }
    },
    total: { 
      type: GraphQLFloat,
      resolve(parentValue, args) {
        return basketResolvers.getBasketItemsByBasketId(parentValue.id)
            .then( response => response.data )
            .then( basketItems => {
              const filters = {
                id: []
              };

              basketItems.forEach(item => filters.id.push(item.productId));

              return filters;
            })
            .then((filters) => {
              return productResolvers.getProducts(filters)
                .then(response => response.data); 
            })
            .then((products) => {
              return products.reduce((a, b) => {
                return a + b.price;
              }, 0);
            });
      } 
    }
  })
});

export default {
  BasketType,
  BasketItemType
};