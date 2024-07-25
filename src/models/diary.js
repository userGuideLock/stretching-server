const { DataTypes } = require('sequelize');

const defineDiary = (sequelize) => {
  const Diary = sequelize.define(
    'Diary',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      mood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      effort: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      modifiedTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'diaries',
    },
  );
  return Diary;
};

module.exports = defineDiary;
