const commentTypes = `
  type Comment {
    id: ID!
    title: String!
    comment: String!
    createdAt: String!
    updatedAt: String!
    user: User!
    post: Post!
  }

  input CommentInput {
    title: String!
    comment: String!
    user: Int!
    post: Int!
  }
`;

const commentQueries = `
  commentsByPost(post: ID!, first: Int, offset: Int) : [ Comment! ]!
`;

const commentMutations = `
  createComment(input: CommentInput!) : Comment
  updateComment(id: ID!, input: CommentInput!) : Comment
  deleteComment(id: ID!) : Boolean
`;

export { commentTypes, commentQueries, commentMutations }