'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResidentPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ResidentPhoto.init({
    File: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ResidentPhoto',
  });
  return ResidentPhoto;
};