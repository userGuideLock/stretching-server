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
        type: DataTypes.STRING,
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
      //기분
      mood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //오늘 하루 스트레스 해소를 위해 진행한 노력
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
