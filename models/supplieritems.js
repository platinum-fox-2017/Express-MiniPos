'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItems = sequelize.define('SupplierItems', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });
  SupplierItems.associate = models => {
    SupplierItems.belongsTo(models.Suppliers, {
      foreignKey:"SupplierId",
    })
    SupplierItems.belongsTo(models.Items, {
      foreignKey:"ItemId",
    })
  }
  return SupplierItems;
};