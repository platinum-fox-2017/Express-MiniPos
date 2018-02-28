'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier_Item = sequelize.define('Supplier_Item', {
    supplierId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });
  Supplier_Item.associate = function (models) {
    Supplier_Item.belongsTo(models.Supplier,{
      foreignKey: 'supplierId'
    })
    Supplier_Item.belongsTo(models.Item,{
      foreignKey: 'itemId'
    })
  };
  return Supplier_Item;
};
