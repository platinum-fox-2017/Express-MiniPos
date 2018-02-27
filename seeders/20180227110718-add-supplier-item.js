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
   return queryInterface.bulkInsert('SupplierItems', [{
    SupplierId: 1,
    ItemId: 1,
    price: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    SupplierId: 1,
    ItemId: 2,
    price: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    SupplierId: 2,
    ItemId: 3,
    price: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    SupplierId: 3,
    ItemId: 1,
    price: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    SupplierId: 3,
    ItemId: 2,
    price: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('SupplierItems', null, {});
  }
};
