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
    },
    {
      timestamps: false,
      tableName: 'users',
    },
  );

  return User;
};

module.exports = defineUser;
