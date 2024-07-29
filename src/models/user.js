const { DataTypes } = require('sequelize');

const defineUser = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      job: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hobby: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      //회원가입한 날짜 자동저장
      createdTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: 'users',
    },
  );

  return User;
};

module.exports = defineUser;
