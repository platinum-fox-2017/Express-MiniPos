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
      name: 'PT. MSA',
      kota: 'Cikarang',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'PT. JBA',
      kota: 'Cirebon',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'PT. Oyama',
      kota: 'Karawang',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'PT. Topy Palingda',
      kota: 'Karawang',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'PT. JuhiPanggang',
      kota: 'Sumedang',
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
    return queryInterface.bulkDelete('Suppliers', null, {});
  }
};
