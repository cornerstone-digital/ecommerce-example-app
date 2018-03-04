import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './graphql/schema';
import jsonServer from 'json-server';

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 4000;

server
  .use(middlewares)
  .use(jsonServer.bodyParser)
  .use('/graphql', expressGraphQL({ graphiql: true, schema }))
  .use(router)
  .use((req, res, next) => {
    if (req.method === 'POST') {
      req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
  })
  .listen(port, () => {
    console.log('Server is listening on port', port);
  });