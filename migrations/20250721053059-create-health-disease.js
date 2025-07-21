'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthDiseases', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      HealthRecordId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HealthRecords',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      DiseaseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        allowNull: false,
        references: {
          model: 'Diseases',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      DiagnosisDate: {
        type: Sequelize.DATEONLY // The date the disease was confirmed or diagnosed.
      },
      OnsetDate: {
        type: Sequelize.DATEONLY // When symptoms first appeared (optional but helps in tracking spread).
      },
      Status: {
        type: Sequelize.ENUM('Ongoing', 'Recovered', 'Deceased')
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
    await queryInterface.dropTable('HealthDiseases');
  }
};