'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthInterventions', {
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
      Type: {
        type: Sequelize.ENUM('Medication', 'Quarantine', 'Home Visit', 'Information Drive'),
        allowNull: false
      },
      MedicationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Medications',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Dosage: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      Frequency: {
        type: Sequelize.TEXT('text'),
        allowNull: true
      },
      StartDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      EndDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      Notes: {
        type: Sequelize.TEXT('long'),
        allowNull: true
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
    await queryInterface.dropTable('HealthInterventions');
  }
};