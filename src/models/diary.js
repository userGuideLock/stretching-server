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
        type: DataTypes.STRING, // VARCHAR(255) 타입, User 모델의 id와 일치
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
