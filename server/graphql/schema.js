import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';

import axios from 'axios';
import uuid from 'uuid';
import graphQL from './index';

const { ProductType } = graphQL.products.types;
const { BasketType } = graphQL.basket.types;
const { 
  ConversionResultType,
  ConversionRateType
} = graphQL.currencies.types;

const basket = {
  id: uuid(),
  currency: '1',
  products: [],
  total: 0
};

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    product: {
      type: ProductType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return axios.get(`http://localhost:4000/products/${id}`)
          .then( response => response.data );
      }
    },
    basket: {
      type: BasketType,
      resolve(parentValue, args) {
        return basket;
      }
    },
    conversion: {
      type: ConversionResultType,
      args: { from: { type: GraphQLString }, to: { type: GraphQLString }, amount: { type: GraphQLFloat}},
      resolve(parentValue, args) {
        return axios.get(`https://apilayer.net/api/convert?access_key=291d6a92d6db179a4f9561eb7b1ee925&from=${args.from}&to=${args.to}&amount=${args.amount}`)
        .then(response => {
          return {
            query: response.data.query,
            result: response.data.result  
          }
        });  
      }
    },
    conversionRates: {
      type: new GraphQLList(ConversionRateType),
      args: { source: { type: GraphQLString }, currencies: { type: GraphQLString }},
      resolve(parentValue, args) {
        return axios.get(`http://apilayer.net/api/live?access_key=291d6a92d6db179a4f9561eb7b1ee925&source=${args.source}&currencies=${args.currencies}`)
        .then(response => {
          const convestionRates = [];
          
          for (let key in response.data.quotes) {
            console.log(key);
            convestionRates.push({
              id: uuid(),
              code: key,
              rate: response.data.quotes[key]
            })
          }

          return convestionRates;
        });
      }
    } 
  })
});

export default new GraphQLSchema({
  query: RootQuery
});