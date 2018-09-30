import bcrypt from 'bcrypt';

import { tryLogin } from '../auth';

import pickErrors from '../pickErrors';
import requireAuth from '../requireAuth';

export default {
  Query: {
    getUser: (_, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (_, args, { models }) => models.User.findAll(),
    checkAuth: (_, args, { user }) => {
      if (!user || !user.id) {
        return { ok: false };
      }
      return { ok: true };
    }
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (_, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          user
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: pickErrors(err, models)
        };
      }
    }
  }
};
