'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthDiseaseMedications', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      HealthDiseaseInterventionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HealthDiseaseInterventions',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      MedicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Medications',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Dosage: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      Frequency: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      StartDate: {
        type: Sequelize.DATEONLY
      },
      EndDate: {
        type: Sequelize.DATEONLY
      },
      Notes: {
        type: Sequelize.TEXT('long')
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
    await queryInterface.dropTable('HealthDiseaseMedications');
  }
};