export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'Username must contain only letters and number'
        },
        len: {
          args: [3, 25],
          msg: 'Username must be between 3 to 25 characters long'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email is not valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: 'Password must be between 5 to 100 characters long'
        }
      }
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
