'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});

  SupplierItem.associate = function(models) {
    SupplierItem.belongsTo(models.Item);
    SupplierItem.belongsTo(models.Supplier);
  };

  SupplierItem.prototype.formatPrice = function() {
    let reverse = this.price.toString().split('').reverse();
    let arr = [];
    for(let i = 0; i < reverse.length; i++) {
      if((i + 1) % 3 == 0 && (i + 1) != reverse.length) {
        arr.push(reverse[i]);
        arr.push('.');
      } else {
        arr.push(reverse[i]);
      }
    }
    
    return 'Rp. '+ arr.reverse().join('');
  };

  return SupplierItem;
};