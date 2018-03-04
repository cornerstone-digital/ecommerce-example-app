import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat
} from 'graphql';

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    currency: { type: GraphQLString }
  })
});