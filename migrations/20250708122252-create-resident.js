'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Residents', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Firstname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Middlename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Suffix: {
        type: Sequelize.STRING
      },
      IsResident: {
        type: Sequelize.BOOLEAN
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Residents');
  }
};