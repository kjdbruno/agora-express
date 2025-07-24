'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthIllness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthServiceAvailment
      HealthIllness.belongsTo(models.HealthServiceAvailment, {
        foreignKey: 'ServiceAvailmentId',
        as: 'healthserviceavailment'
      });

      // Association with Illness
      HealthIllness.belongsTo(models.Illness, {
        foreignKey: 'IllnessId',
        as: 'illness'
      });

    }
  }
  HealthIllness.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    ServiceAvailmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HealthServiceAvailments',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    IllnessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Illnesses',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Notes: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'HealthIllness',
    tableName: 'HealthIllnesses',
    timestamps: true
  });
  return HealthIllness;
};