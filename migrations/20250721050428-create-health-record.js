'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthRecords', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ServiceAvailmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HealthServiceAvailments',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Height: {
        type: Sequelize.FLOAT
      },
      Weight: {
        type: Sequelize.FLOAT
      },
      BMI: {
        type: Sequelize.FLOAT
      },
      BloodPressure: {
        type: Sequelize.STRING
      },
      Temperature: {
        type: Sequelize.FLOAT
      },
      PulseRate: {
        type: Sequelize.FLOAT
      },
      Notes: {
        type: Sequelize.TEXT('long')
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        defaultvalue: true
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
    await queryInterface.dropTable('HealthRecords');
  }
};