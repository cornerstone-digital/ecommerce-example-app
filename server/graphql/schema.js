import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

import axios from 'axios';
import uuid from 'uuid';
import graphQL from './index';

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
      type: graphQL.types.ProductType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return graphQL.resolvers.getProductById(id)
          .then( response => response.data );
      }
    },
    basket: {
      type: graphQL.types.BasketType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return graphQL.resolvers.getBasketById(id)
          .then( response => response.data );;
      }
    },
    conversion: {
      type: graphQL.types.ConversionResultType,
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
      type: new GraphQLList(graphQL.types.ConversionRateType),
      args: { source: { type: GraphQLString }, currencies: { type: GraphQLString }},
      resolve(parentValue, args) {
        return axios.get(`http://apilayer.net/api/live?access_key=291d6a92d6db179a4f9561eb7b1ee925&source=${args.source}&currencies=${args.currencies}`)
        .then(response => {
          const convestionRates = [];
          
          for (let key in response.data.quotes) {
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

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createBasket: {
      type: graphQL.types.BasketType,
      args: {
        currencyId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { currencyId }) {
        const basket = {
          id: uuid(),
          currencyId, 
          "productIds": [],
          "total": 0
        };

        return graphQL.mutations.createBasket(basket)
          .then(response => response.data);
      }
    },
    deleteBasket: {
      type: graphQL.types.BasketType,
      args: {
        basketId: { type: new GraphQLNonNull(GraphQLString) } 
      },
      resolve(parentValue, { basketId }) {
        return graphQL.mutations.deleteBasket(basketId)
          .then(response => response.data);
      }
    },
    addBasketItem: {
      type: graphQL.types.BasketItemType,
      args: {
        basketId: { type: new GraphQLNonNull(GraphQLString) }, 
        productId: { type: new GraphQLNonNull(GraphQLString) }, 
        quantity: { type: new GraphQLNonNull(GraphQLInt) }  
      },
      resolve(parentValue, { basketId, productId, quantity }) {
        return graphQL.mutations.addBasketItem(basketId, productId, quantity)
          .then(response => response.data);
      }
    },
    removeBasketItem: {
      type: graphQL.types.BasketItemType,
      args: {
        basketItemId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { basketItemId }) {
        return graphQL.mutations.removeBasketItem(basketItemId)
          .then(response => response.data);
      }
    },
    changeBasketCurrency: {
      type: graphQL.types.BasketType,
      args: {
        basketId: { type: new GraphQLNonNull(GraphQLString) },
        currencyId: { type: new GraphQLNonNull(GraphQLString) }  
      },
      resolve(parentValue, { basketId, currencyId }) {
        return graphQL.mutations.changeBasketCurrency(basketId, currencyId)
          .then(response => response.data);
      }
    }
  })
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation
});