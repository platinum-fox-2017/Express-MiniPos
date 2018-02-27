'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {});
  Supplier.associate = models=>{
    Supplier.belongsToMany(models.Item,{
      through:'SupplierItem',
      foreignKey: 'SupplierId'      
    })
    Supplier.hasMany(models.SupplierItem,{
      foreignKey:'SupplierId'
    })
  }
  
  return Supplier;
};