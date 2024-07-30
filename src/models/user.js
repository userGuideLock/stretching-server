const { DataTypes } = require('sequelize');

const defineUser = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.STRING, // VARCHAR(255) 타입
        allowNull: false,
        primaryKey: true,
        unique: true, // 유니크 제약 조건 추가
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
