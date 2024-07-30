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
  await db.User.sync({ force: false }); // User 모델 먼저 동기화
  await db.Diary.sync({ force: false });
  await db.Survey.sync({ force: false });
};

module.exports = {
  ...db,
  initModels,
};
