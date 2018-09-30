import _ from 'lodash';

export default (err, models) => {
  if (err instanceof models.sequelize.ValidationError) {
    return err.errors.map(e => _.pick(e, ['path', 'message']));
  }
  return [{ path: 'database', message: 'something went wrong' }];
};
