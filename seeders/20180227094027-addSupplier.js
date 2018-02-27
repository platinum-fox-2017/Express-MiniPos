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
    return queryInterface.bulkInsert('Suppliers', [{
      Name: 'PT. Angin Ribut',
      City: 'Jakarta Barat',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      Name: 'PT. Debu-Debu Intan',
      City: 'Semarang',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      Name: 'PT. Berdikarya',
      City: 'Ambon',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      Name: 'PT. Jaya Abadi',
      City: 'Yogyakarta',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      Name: 'PT. Mutiara Laut',
      City: 'Bandung',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
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
