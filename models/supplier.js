'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    city: DataTypes.STRING
  },{
    hooks:{
      afterDestroy:function(Supplier,options){
        console.log('hooooooooookkkkkkkk')
      }
    }
  });
  Supplier.associate = function(models){
    Supplier.belongsToMany(models.Item,{through :models.SupplierItem,foreignKey: 'SupplierId'})
    Supplier.hasMany(models.SupplierItem,{foreignKey: 'SupplierId'})
  };
  return Supplier;
};