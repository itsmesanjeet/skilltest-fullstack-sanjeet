const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const schemas = require('./schemas/index.js'); // 📦 Combined schemas
const resolver = require('./resolvers/index.js');

const typeDefs = mergeTypeDefs(schemas);
const resolvers = mergeResolvers(resolver);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
