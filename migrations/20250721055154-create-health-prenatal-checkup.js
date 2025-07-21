'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthPrenatalCheckups', {
      id: {
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
      MaternalRecordId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HealthMaternalRecords',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      GestationAge: { // Weeks of pregnancy during the visit.
        type: Sequelize.FLOAT,
        allowNull: false
      },
      FundicHeight: { // Uterine size in cm (helps monitor fetal growth).
        type: Sequelize.FLOAT,
        allowNull: false
      },
      HasHeartbeat: { // Was fetal heartbeat heard?
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      Complaints: { // Symptoms the mother reported (e.g., back pain, bleeding).
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      Intervention: { // Advice given by health worker (e.g., rest, meds).
        type: Sequelize.TEXT('long'),
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
    await queryInterface.dropTable('HealthPrenatalCheckups');
  }
};