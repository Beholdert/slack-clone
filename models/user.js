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

  User.associate = model => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreighKey: 'userId'
    });
  };

  return User;
};