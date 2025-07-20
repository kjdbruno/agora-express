'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blotter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with BlotterType
      Blotter.belongsTo(models.BlotterType, {
        foreignKey: 'BlotterTypeId',
        as: 'blotterType'
      });

        // Association with BlotterAction
      Blotter.hasMany(models.BlotterAction, {
        foreignKey: 'BlotterId',
        as: 'blotterActions'
      });

      // Association with BlotterHandler
      Blotter.hasMany(models.BlotterHandler, {
        foreignKey: 'BlotterId',
        as: 'blotterHandlers'
      });

      // Association with BlotterParty
      Blotter.hasMany(models.BlotterParty, {
        foreignKey: 'BlotterId',
        as: 'blotterParties'
      });

      // Association with BlotterAttachment
      Blotter.hasMany(models.BlotterAttachment, {
        foreignKey: 'BlotterId',
        as: 'blotterAttachments'
      });

    }
  }
  Blotter.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    CaseNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    BlotterTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BlotterTypes',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    IncidentDate: {
      type: DataTypes.DATE
    },
    Location: {
      type: DataTypes.TEXT('long')
    },
    Description: {
      type: DataTypes.TEXT('long')
    },
    Status: {
      type: DataTypes.ENUM('Filed', 'Ongoing', 'Resolved', 'Dismissed'),
      defaultValue: 'Filed'
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Blotter',
    tableName: 'Blotters',
    timestamps: true,
  });
  return Blotter;
};