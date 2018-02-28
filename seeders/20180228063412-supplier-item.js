'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SupplierItems', [{
      supplierId: Math.ceil(Math.random() * 3),
      itemId: Math.ceil(Math.random() * 5),
      price: Math.ceil(Math.random() * 100000000),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
        supplierId: Math.ceil(Math.random() * 3),
        itemId: Math.ceil(Math.random() * 5),
        price: Math.ceil(Math.random() * 100000000),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        supplierId: Math.ceil(Math.random() * 3),
        itemId: Math.ceil(Math.random() * 5),
        price: Math.ceil(Math.random() * 100000000),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        supplierId: Math.ceil(Math.random() * 3),
        itemId: Math.ceil(Math.random() * 5),
        price: Math.ceil(Math.random() * 100000000),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        supplierId: Math.ceil(Math.random() * 3),
        itemId: Math.ceil(Math.random() * 5),
        price: Math.ceil(Math.random() * 100000000),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SupplierItems', null, {});
  }
};
