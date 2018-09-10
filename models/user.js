export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  });

  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreighKey: { name: 'userId', field: 'user_id' }
    });
    User.belongsToMany(models.Channel, {
      //N:M
      through: 'channel_member',
      foreighKey: { name: 'userId', field: 'user_id' }
    });
  };

  return User;
};
