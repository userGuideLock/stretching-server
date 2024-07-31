const { DataTypes } = require('sequelize');
// models/userToken.js
const defineUserFCMToken = (sequelize) => {
  const UserToken = sequelize.define(
    'UserToken',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'user_tokens',
      timestamps: false,
    },
  );

  return UserToken;
};

module.exports = defineUserFCMToken;
