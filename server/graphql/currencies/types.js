import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat
} from 'graphql';

const CurrencyType = new GraphQLObjectType({
  name: 'Currency',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
    symbol: { type: GraphQLString }
  })
});

const ConversionRateType = new GraphQLObjectType({
  name: 'ConversionRate',
  fields: () => ({
    id: { type: GraphQLString },
    code: { type: GraphQLString },
    rate: { type: GraphQLString }
  })
});

const ConversionQueryType = new GraphQLObjectType({
  name: 'ConversionQuery',
  fields: {
    from: { type: GraphQLString },
    to: { type: GraphQLString },
    amount: { type: GraphQLFloat },
  }
})

const ConversionResultType = new GraphQLObjectType({
  name: 'ConversionResult',
  fields: () => ({
    query: { type: ConversionQueryType },
    result: { type: GraphQLFloat }
  })
});

export default {
  CurrencyType,
  ConversionRateType,
  ConversionQueryType,
  ConversionResultType
};