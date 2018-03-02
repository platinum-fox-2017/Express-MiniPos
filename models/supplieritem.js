'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    supplierId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });
  SupplierItem.associate = function (models) {
    SupplierItem.belongsTo(models.Item, { foreignKey: 'itemId' })
    SupplierItem.belongsTo(models.Supplier, { foreignKey: 'supplierId' })
  };
  return SupplierItem;
};