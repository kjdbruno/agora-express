'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthDelivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthMaternalRecord
      HealthDelivery.belongsTo(models.HealthMaternalRecord, {
        foreignKey: 'MaternalRecordId',
        as: 'healthmaternalrecord'
      });

      // Association with Resident
      HealthDelivery.belongsTo(models.Resident, {
        foreignKey: 'ResidentId',
        as: 'resident'
      });
      
    }
  }
  HealthDelivery.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ResidentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Residents',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    MaternalRecordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HealthMaternalRecords',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    DeliveryDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    DeliveryPlace: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    DeliveryType: {
      type: DataTypes.ENUM('Normal Spontaneous', 'Caesarian', 'Assisted'),
      allowNull: false
    },
    BirthWeight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    BirthLength: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ApgarScore: {
      type: DataTypes.TEXT('long'),
      allowNull: false
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
    modelName: 'HealthDelivery',
    tableName: 'HealthDeliveries',
    timestamps: true
  });
  return HealthDelivery;
};