'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RevenueCosts', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RevenueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'RevenueItems',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      Surcharge: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      Interest: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      Month: {
        type: Sequelize.ENUM('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
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
    await queryInterface.dropTable('RevenueCosts');
  }
};