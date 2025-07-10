'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Roles', [
      { Name: 'Super Administrator', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Administrator', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Supervisor', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Barangay Health Worker', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Lupong Tagapamayapa', CreatedAt: new Date(), UpdatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
