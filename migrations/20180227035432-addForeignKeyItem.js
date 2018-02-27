'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   queryInterface.addConstraint('SupplierItems', ['ItemId'], {
    type: 'foreign key',
    name: 'Conjunction_Item',
    references: { //Required field
      table: 'Items',
      field: 'id'
    },
    onDelete: 'cascade',
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
