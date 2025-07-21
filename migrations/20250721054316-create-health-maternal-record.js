'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthMaternalRecords', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ResidentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Residents',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      LMP: { // last menstrual period
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      EDD: { // expected date of delivery
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      IsHighRisk: {
        type: Sequelize.BOOLEAN
      },
      ReskFactors: {
        type: Sequelize.TEXT('long')
      },
      Status: {
        type: Sequelize.ENUM('Ongoing', 'Delivered', 'Aborted')
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
    await queryInterface.dropTable('HealthMaternalRecords');
  }
};