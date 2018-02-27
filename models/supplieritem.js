'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});

  SupplierItem.associate = function(models) {
    SupplierItem.belongsTo(models.Supplier),
    SupplierItem.belongsTo(models.Item)
  };

  SupplierItem.prototype.formatUang = function() {
    let number = this.price;
    let reverse = number.toString().split('').reverse();
    let arr= [];
    for(var i = 0; i<reverse.length;i++){
      if((i+1) % 3 === 0 && (i+1) !== reverse.length){
        arr.push(reverse[i]);
        arr.push('.');
      }else{
        arr.push(reverse[i]);
      }
    }
    
    return 'Rp. '+arr.reverse().join('');
  }
  return SupplierItem;
};