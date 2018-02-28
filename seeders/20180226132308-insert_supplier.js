'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Suppliers', [
      {
        name: 'PT. UniWorld Jakarta',
        kota: 'Jakarta',
        createdAt: new Date,
        updatedAt: new Date()
      },
      {
        name: 'PT. Makmur Jaya Phone',
        kota: 'Batam',
        createdAt: new Date,
        updatedAt: new Date()
      },
      {
        name: 'PT. Siang Makan Malam Kagak',
        kota: 'Bekasi',
        createdAt: new Date,
        updatedAt: new Date()
      },
      {
        name: 'PT. Bolak Balik',
        kota: 'Balikpapan',
        createdAt: new Date,
        updatedAt: new Date()
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
