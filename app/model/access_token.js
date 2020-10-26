module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const accessToken = app.model.define('access_token', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    accessToken: {
      field: 'access_token',
      type: STRING(255),
    },
  }, {
    timestamps: true,
    // paranoid: true,
    freezeTableName: true,
  });
  return accessToken;
};
