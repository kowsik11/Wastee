import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import linksRouter from './routes/links';
import { auth } from './middleware/auth';
import { limiter } from './middleware/rateLimit';
import { typeDefs, resolvers } from './graphql/schema';

const app = express();
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(auth);
app.use('/links', linksRouter);

async function start() {
  const apollo = new ApolloServer({ typeDefs, resolvers });
  await apollo.start();
  apollo.applyMiddleware({ app });
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`API listening on ${port}`));
}

start();
