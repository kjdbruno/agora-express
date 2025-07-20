'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlotterActionAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with BlotterAction
      BlotterActionAttachment.belongsTo(models.BlotterAction, {
        foreignKey: 'BlotterActionId',
        as: 'blotterAction'
      });
      
    }
  }
  BlotterActionAttachment.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    BlotterActionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BlotterActions',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    File: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'BlotterActionAttachment',
    tableName: 'BlotterActionAttachments',
    timestamps: true,
  });
  return BlotterActionAttachment;
};