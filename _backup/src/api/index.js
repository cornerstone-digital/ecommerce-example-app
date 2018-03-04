import express from 'express';

const server = express();
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log('API Server listening on', PORT);
});