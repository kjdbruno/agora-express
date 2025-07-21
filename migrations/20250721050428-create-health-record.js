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
      VisitType: {
        type: Sequelize.ENUM('Consultation', 'Pre-Natal', 'Post-Natal', 'Immunization'),
        allowNull: false
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