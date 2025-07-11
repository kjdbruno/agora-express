'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with BusinessType
      Business.belongsTo(models.BusinessType, {
        foreignKey: 'BusinessTypeId',
        as: 'businessType',
      });

      // Association with BusinessNature
      Business.belongsTo(models.BusinessNature, {
        foreignKey: 'BusinessNatureId',
        as: 'businessNature',
      });

      // Association with Resident
      Business.belongsTo(models.Resident, {
        foreignKey: 'ResidentId',
        as: 'resident',
      });

      // Association with Zone
      Business.belongsTo(models.Zone, {
        foreignKey: 'ZoneId',
        as: 'zone',
      });
    }
  }
  Business.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BusinessTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BusinessTypes',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    BusinessNatureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BusinessNatures',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    ResidentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Residents',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    Capitalization: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    Gross: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    ZoneId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Zones',
        key: 'Id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Business',
    tableName: 'Businesses',
    timestamps: true,
  });
  return Business;
};