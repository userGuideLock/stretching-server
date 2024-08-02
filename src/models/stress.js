// 매일 스트레스를 기록하는 모델
// 스트레스를 기록할 때마다 스트레스를 기록한 날짜를 기록한다.

const { DataTypes } = require('sequelize');

const defineStress = (sequelize) => {
  const Stress = sequelize.define(
    'Stress',
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'stresses',
    },
  );

  return Stress;
};

module.exports = defineStress;
