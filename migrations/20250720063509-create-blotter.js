'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Blotters', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BlotterTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BlotterTypes',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      CaseNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      IncidentDate: {
        type: Sequelize.DATE
      },
      Location: {
        type: Sequelize.TEXT('long')
      },
      Description: {
        type: Sequelize.TEXT('long')
      },
      Status: {
        type: Sequelize.ENUM('Filed', 'Ongoing', 'Resolved', 'Dismissed'),
        defaultValue: 'Filed'
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
    await queryInterface.dropTable('Blotters');
  }
};