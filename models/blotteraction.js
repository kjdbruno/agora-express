'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlotterAction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Blotter
      BlotterAction.belongsTo(models.Blotter, {
        foreignKey: 'BlotterId',
        as: 'blotter'
      });

      // Association with BlotterActionAttachment
      BlotterAction.hasMany(models.BlotterActionAttachment, {
        foreignKey: 'BlotterActionId',
        as: 'attachments'
      });

    }
  }
  BlotterAction.init({
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
    Action: {
      type: DataTypes.TEXT('long'),
    },
    Date: {
      type: DataTypes.DATE,
    },
    Remarks: {
      type: DataTypes.STRING,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'BlotterAction',
    tableName: 'BlotterActions',
    timestamps: true,
  });
  return BlotterAction;
};