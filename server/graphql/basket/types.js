import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList
} from 'graphql';

import { CurrencyType } from '../currencies/types';
import { ProductType } from '../products/types';

export const BasketType = new GraphQLObjectType({
  name: 'Basket',
  fields: () => ({
    id: { type: GraphQLString},
    currency: { 
      type: CurrencyType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:4000/currencies/${parentValue.currency}`)
          .then( response => response.data );  
      }
    },
    products: { 
      type: new GraphQLList(ProductType),
      resolve(parentValue, args) {
        let qsItems = [];
        parentValue.products.forEach(product => {
          qsItems.push(`id=${product.id}`);
        }) 

        const qs = qsItems.join('&');
        
        return axios.get(`http://localhost:4000/products?${qs}`)
          .then( response => {
            basket.products = response.data;
            return response.data
          });
      }
    },
    total: { 
      type: GraphQLFloat,
      resolve(parentValue, args) {
        basket.total = basket.products.reduce((a, b) => {
          return a + b.price;
        }, 0);

        return basket.total;
      } 
    }
  })
});