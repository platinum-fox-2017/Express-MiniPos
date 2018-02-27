'use strict';
module.exports = (sequelize, DataTypes) => {
  var supplierItem = sequelize.define('supplierItem', {
    supplierId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  })
  supplierItem.associate = function(models){
    supplierItem.belongsTo(models.item,{foreignKey : 'itemId'})
    supplierItem.belongsTo(models.supplier,{foreignKey : 'supplierId'}) 
  }
  return supplierItem;
};