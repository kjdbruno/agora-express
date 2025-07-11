'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BarangaySettings', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Seal: {
        type: Sequelize.STRING
      },
      BarangayId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Barangays',
          key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      TownId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Towns',
          key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      ProvinceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Provinces',
          key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('BarangaySettings');
  }
};