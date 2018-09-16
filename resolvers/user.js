import bcrypt from 'bcrypt';
import _ from 'lodash';

import { tryLogin } from '../auth';

const pickErrors = (err, models) => {
  if (err instanceof models.sequelize.ValidationError) {
    return err.errors.map(e => _.pick(e, ['path', 'message']));
  }
  return [{ path: 'database', message: 'something went wrong' }];
};
export default {
  Query: {
    getUser: (_, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (_, args, { models }) => models.User.findAll()
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (_, { password, ...args }, { models }) => {
      try {
        if (password.length < 5 || password.length > 100) {
          return {
            ok: false,
            errors: [
              {
                path: 'password',
                message: 'Password must be between 5 to 100 characters long'
              }
            ]
          };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({
          ...args,
          password: hashedPassword
        });
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
