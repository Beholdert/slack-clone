import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import models from './models';
import jwt from 'jsonwebtoken';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);

const SECRET = 'qwe3214123asqwe';
const SECRET2 = '213312qweeqw';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const addUser = (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const payload = jwt.verify(token, SECRET);
      console.log(payload);
      const { user } = payload;

      req.user = user;
    } catch (error) {}
  }
  next();
};

const app = express();

app.use(cors('*'));
app.use(addUser);
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      user: req.user,
      SECRET,
      SECRET2
    }
  }))
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

models.sequelize.sync().then(() => {
  app.listen(8080, () => console.log('server is listening'));
});
