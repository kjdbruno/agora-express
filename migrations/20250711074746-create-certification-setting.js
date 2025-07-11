'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CertificationSettings', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CertificationTypeId: {
        type: Sequelize.INTEGER
      },
      Cost: {
        type: Sequelize.DECIMAL
      },
      Surcharge: {
        type: Sequelize.INTEGER
      },
      Interest: {
        type: Sequelize.INTEGER
      },
      Month: {
        type: Sequelize.ENUM,
        values: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        allowNull: false
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('CertificationSettings');
  }
};