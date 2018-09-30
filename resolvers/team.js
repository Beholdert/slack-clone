import pickErrors from '../pickErrors';
import requireAuth from '../requireAuth';

export default {
  Query: {
    allTeams: requireAuth((parent, args, { models, user }) => {
      return models.Team.findAll({ where: { owner: user.id } }, { raw: true });
    })
  },
  Mutation: {
    createTeam: requireAuth(async (parent, args, { models, user }) => {
      try {
        const team = await models.Team.create({ ...args, owner: user.id });
        await models.Channel.create({
          name: 'general',
          teamId: team.id,
          public: true
        });
        return {
          ok: true,
          team
        };
      } catch (error) {
        console.log(error);
        return { ok: false, errors: pickErrors(error, models) };
      }
    })
  },
  Team: {
    channels: ({ id }, _, { models }) => {
      return models.Channel.findAll({ where: { teamId: id } });
    }
  }
};
