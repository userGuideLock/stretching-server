const { Sequelize } = require('sequelize');
const config = require('../config/config.json');
const defineDiary = require('./diary');
const defineUser = require('./user');
const defineSurvey = require('./survey');

console.log(
  'host: ' + config.host,
  'username: ' + config.username,
  'password: ' + config.password,
);

const defineUserFCMToken = require('./userFCMToken');
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
  User: defineUser(sequelize), // 모델을 초기화
  Diary: defineDiary(sequelize), // 모델을 초기화
  Survey: defineSurvey(sequelize),
  UserFCMToken: defineUserFCMToken(sequelize),
};

// Define associations
db.User.hasMany(db.Diary, {
  foreignKey: 'userId',
});
db.Diary.belongsTo(db.User, {
  foreignKey: 'userId',
});

db.User.hasOne(db.Survey, {
  foreignKey: 'userId',
});
db.Survey.belongsTo(db.User, {
  foreignKey: 'userId',
});

const initModels = async () => {
  await db.sequelize.sync({ force: false, alter: true });
};

module.exports = {
  ...db,
  initModels,
};
