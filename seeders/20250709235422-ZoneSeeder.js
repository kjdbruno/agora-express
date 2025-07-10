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
   await queryInterface.bulkInsert('Zones', [
      { Name: 'Purok 1', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Purok 2', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Purok 3', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Purok 4', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Purok 5', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Purok 6', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Purok 7', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Purok 8', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Purok 9', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Purok 10', CreatedAt: new Date(), UpdatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Zones', null, {});
  }
};
