import { GraphQLResolveInfo } from "graphql";
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { UserInstance } from "../../../models/UserModel";
import { Transaction } from "sequelize";

export const userResolvers = {

  User: {
    posts: (parent, {first = 20, offset = 0}, {db_connection}:{db_connection: DbConnection}, infor: GraphQLResolveInfo) => {
      return db_connection.Post
        .findAll({
          where: {author: parent.get('id')},
          limit: first,
          offset: offset
        })
    }
  },

  Query : {

    users: (parent, {first = 20, offset = 0}, {db_connection}:{db_connection: DbConnection}, infor: GraphQLResolveInfo) => {
      return db_connection.User.findAll({ limit: first, offset: offset });
    },

    user: (parent, {id}, {db_connection}:{db_connection: DbConnection}, infor: GraphQLResolveInfo) => {
      return db_connection.User.findById(id)
        .then((user: UserInstance) => {
          if (!user) throw new Error(`User with id ${id} not found in context!`);
          return user;
        })
    },

  },

  Mutation: {
    createUser: (parent, {input}, {db_connection}:{db_connection: DbConnection}, infor: GraphQLResolveInfo) => {
      return db_connection.sequelize.transaction((t: Transaction) => {
        return db_connection.User
          .create(input, {transaction: t});
      });
    },

    updateUser: (parent, {id, input}, {db_connection}:{db_connection: DbConnection}, infor: GraphQLResolveInfo) => {
      id = parseInt(id);
      return db_connection.sequelize.transaction((t: Transaction) => {
        return db_connection.User.findById(id)
          .then((user: UserInstance) => {
            if (!user) throw new Error(`User with id ${id} not found in context!`);
            return user.update(input, {transaction: t});
          })
      });
    },

    updateUserPassword: (parent, {id, input}, {db_connection}:{db_connection: DbConnection}, infor: GraphQLResolveInfo) => {
      id = parseInt(id);
      return db_connection.sequelize.transaction((t: Transaction) => {
        return db_connection.User.findById(id)
          .then((user: UserInstance) => {
            if (!user) throw new Error(`User with id ${id} not found in context!`);
            return user.update(input, {transaction: t})
              .then((user: UserInstance) => !!user );
          })
      });
    },

    deleteUser: (parent, {id}, {db_connection}:{db_connection: DbConnection}, infor: GraphQLResolveInfo) => {
      id = parseInt(id);
      return db_connection.sequelize.transaction((t: Transaction) => {
        return db_connection.User
          .findById(id)
          .then((user: UserInstance) => {
            if (!user) throw new Error(`User with id ${id} not found in context!`);
            return user
              .destroy({transaction: t})
              .then( user => !!user );
          })
      });
    }
  }
}