'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  SupplierItem.associate= models=>{
    SupplierItem.belongsTo(models.Item,{
      foreignKey: 'ItemId'  
    })
    SupplierItem.belongsTo(models.Supplier,{
      foreignKey: 'SupplierId'  
    })
  }
  return SupplierItem;
};