'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Suppliers', [{
      name: 'PT. Angin Ribut',
      city: 'Jakarta Barat',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
        name: 'PT. Debu-Debu Intan',
        city: 'Semarang',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'PT. Berdikarya',
        city: 'Ambon',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Suppliers', null, {});
  }
};
