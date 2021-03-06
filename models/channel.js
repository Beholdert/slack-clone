export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    name: DataTypes.STRING,
    public: { type: DataTypes.BOOLEAN, default: true }
  });

  Channel.associate = models => {
    //1:M
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: 'teamId',
        field: 'team_id'
      }
    });
    Channel.belongsToMany(models.User, {
      //N:M
      through: 'channel_member',
      foreighKey: { name: 'channelId', field: 'channel_id' }
    });
  };

  return Channel;
};
