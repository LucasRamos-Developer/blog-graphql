import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { GraphQLResolveInfo } from "graphql";
import { PostInstance } from "../../../models/PostModel";

export const postResolvers = {
  Query : {
    posts: (parent, {first = 20, offset = 0}, {db_connection}:{db_connection: DbConnection}, infor: GraphQLResolveInfo) => {
      return db_connection.Post
        .findAll({
          limit: first,
          offset: offset
        })
    },
    post: (parent, {id}, {db_connection}:{db_connection: DbConnection}, infor: GraphQLResolveInfo) => {
      return db_connection.Post
        .findById(id)
        .then((post: PostInstance) => {
          if (!post) throw new Error(`Post with id ${id} not found in context!`);
          return post;
        })
    }
  }

}