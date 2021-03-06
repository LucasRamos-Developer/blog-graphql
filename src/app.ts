import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import schema from './graphql/schema';
import db_connection from './models'

class App {
  public express : express.Application;

  constructor () {
    this.express = express();
    this.middleware();
  }

  private middleware() : void {

    this.express.use('/query',
      (req, res, next) => {
        req['context'] = {};
        req['context']['db_connection'] = db_connection;
      }, 
      graphqlHTTP((req) => ({
        schema: schema,
        graphiql: process.env.NODE_ENV === 'development',
        context: req['context']
      }))
    );

  }
}

export default new App().express;