'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  SupplierItem.associate = function(models) {
    SupplierItem.belongsTo(models.Supplier)
    SupplierItem.belongsTo(models.Item)
  };
  return SupplierItem;
};
