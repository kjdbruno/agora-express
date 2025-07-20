'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlotterParty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Blotter
      BlotterParty.belongsTo(models.Blotter, {
        foreignKey: 'BlotterId',
        as: 'blotter'
      });

      // Association with Resident
      BlotterParty.belongsTo(models.Resident, {
        foreignKey: 'ResidentId',
        as: 'resident'
      });

    }
  }
  BlotterParty.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    BlotterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Blotters',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
    Role: {
      type: DataTypes.ENUM('Complainant', 'Respondent', 'Witness'),
      allowNull: false
    },
    Statement: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'BlotterParty',
    tableName: 'BlotterParties',
    timestamps: true,
  });
  return BlotterParty;
};