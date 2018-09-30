export default `
  type Team {
    name: String!
    id: Int!
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }

  type Query {
    allTeams: [Team!]!
  }

  type CreateTeamResponse {
    ok: Boolean!
    errors: [Error!]
    team: Team!
  }
  
  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
  }
`;
