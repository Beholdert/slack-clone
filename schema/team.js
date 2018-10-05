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

  type VoidResponse {
    ok: Boolean!
    errors: [Error!]
  }
  
  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
    addTeamMember(email: String!, teamId: Int!): VoidResponse!
  }
`;
