'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    Price: DataTypes.INTEGER
  }, {});
  SupplierItem.associate = function(models) {
    // associations can be defined here
    SupplierItem.belongsTo(models.Supplier)
    SupplierItem.belongsTo(models.Item)
  };
  return SupplierItem;
};