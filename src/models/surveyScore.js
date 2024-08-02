const { DataTypes } = require('sequelize');

const defineSurveyScore = (sequelize) => {
  const SurveyScore = sequelize.define(
    'SurveyScore',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      score: {
        type: DataTypes.INTEGER,
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
    },
    {
      timestamps: false,
      tableName: 'surveyScores',
    },
  );
  return SurveyScore;
};

module.exports = defineSurveyScore;
