'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SupplierItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SupplierId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Suppliers",
          key: 'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      ItemId: {
        type: Sequelize.INTEGER,
        references: {
          model:"Items",
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SupplierItems');
  }
};