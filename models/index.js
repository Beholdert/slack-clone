import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack', 'sanokushakov', '', {
  dialect: 'postgres'
});

const models = {
  Users: sequelize.import('./users'),
  Channel: sequelize.import('./channel'),
  Member: sequelize.import('./member'),
  Message: sequelize.import('./message'),
  Team: sequelize.import('./team')
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
