'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthDiseaseInterventions', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      HealthDiseaseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HealthDiseases',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Type: {
        type: Sequelize.ENUM('Medication', 'Quarantine', 'Home Visit', 'Information Drive')
      },
      Description: {
        type: Sequelize.TEXT('long')
      },
      DateImplemented: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('HealthDiseaseInterventions');
  }
};