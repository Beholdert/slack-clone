export default `
  type User {
    id: Int!
    username: String!
    email: String!
    messages: Message!
    teams: [Team!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }
`;
