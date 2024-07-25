const { DataTypes } = require('sequelize');

const defineSurvey = (sequelize) => {
  const Survey = sequelize.define(
    'Survey',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
          model: 'users', // refers to table name
          key: 'id', // refers to column name in users table
        },
        onDelete: 'CASCADE',
      },
      userId: {
        type: DataTypes.STRING,
        references: {
          model: 'users', // User table name
          key: 'id', // User table primary key
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      step1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step5: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step6: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step7: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step8: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step9: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step10: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step11: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step12: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step13: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step14: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step15: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step16: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step17: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step18: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step19: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step20: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step21: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      step22: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'surveys',
    },
  );
  return Survey;
};

module.exports = defineSurvey;
