'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Businesses', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      ZoneId: {
        type: Sequelize.INTEGER
      },
      BusinessTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BusinessTypes',
          key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      BusinessNatureId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BusinessNatures',
          key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
      },
      ResidentId: {
        type: Sequelize.INTEGER
      },
      Capitalization: {
        type: Sequelize.DECIMAL(10, 2)
      },
      Gross: {
        type: Sequelize.DECIMAL(10, 2)
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
    await queryInterface.dropTable('Businesses');
  }
};