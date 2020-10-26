module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      openid: STRING(100),
      token: STRING(255),
      password: STRING(255),
      username: STRING(255),
      role: STRING(50),
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  return User;
};
