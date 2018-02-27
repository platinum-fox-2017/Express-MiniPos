'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
    
  });
  SupplierItem.associate = function (models){
    // SupplierItem -- > Supplier
    SupplierItem.belongsTo(models.Supplier,{
      foreignKey: 'SupplierId'
    })

    // SupplierItem -- > Item
    SupplierItem.belongsTo(models.Item,{
      foreignKey: 'ItemId',
      onDelete : 'CASCADE',
      hooks: true
    })
  }
  return SupplierItem;
};