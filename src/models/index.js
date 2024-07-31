const { Sequelize } = require('sequelize');
const config = require('../config/config.json');
const defineDiary = require('./diary');
const defineUser = require('./user');
const defineSurvey = require('./survey');
const defineUserFCMToken = require('./UserFCMToken');
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mariadb',
    dialectOptions: {
      allowPublicKeyRetrieval: true,
    },
    port: config.port,
  },
);

const db = {
  sequelize,
  Sequelize,
  Diary: defineDiary(sequelize), // 모델을 초기화
  User: defineUser(sequelize), // 모델을 초기화
  Survey: defineSurvey(sequelize),
  UserFCMToken: defineUserFCMToken(sequelize),
};

// Define associations
db.User.hasOne(db.Survey, {
  foreignKey: 'userId',
});
db.Survey.belongsTo(db.User, {
  foreignKey: 'userId',
});

const initModels = async () => {
  await db.Diary.sync({ force: false }); // force = true 시, 삭제 후 초기화
  await db.User.sync({ force: false });
  await db.Survey.sync({ force: false });
  await db.UserFCMToken.sync({ force: false });
};

module.exports = {
  ...db,
  initModels,
};
