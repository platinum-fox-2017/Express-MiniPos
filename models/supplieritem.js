'use strict';
const formatUang = require('../helpers/formatUang')
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    hooks:{
      
    }
  });
  SupplierItem.associate= models=>{
    SupplierItem.belongsTo(models.Item,{
      foreignKey: 'ItemId'  
    })
    SupplierItem.belongsTo(models.Supplier,{
      foreignKey: 'SupplierId'  
    })
  }
  SupplierItem.prototype.format_Uang = function(){
    return formatUang(this.price)
  }

  return SupplierItem;
};