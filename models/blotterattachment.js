'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlotterAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Blotter
      BlotterAttachment.belongsTo(models.Blotter, {
        foreignKey: 'BlotterId',
        as: 'blotter'
      });
      
    }
  }
  BlotterAttachment.init({
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
    File: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'BlotterAttachment',
    tableName: 'BlotterAttachments',
    timestamps: true,
  });
  return BlotterAttachment;
};