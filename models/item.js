'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name:  DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type     : DataTypes.STRING,
      validate : {
        isUnique(value, next) {
         Item.findAll({
           where:
             {
               codeitem: value
             }
         })
         .then(function (result) {
           if (result == null || result.length == 0) {
             return next()
           } else {
             return next(`Code Item harus Unik`)
           }
         })
       },
       is : {
         args : /(HP|SW|LP)\d{4}/,
         msg  : "Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka"
       }
      }
    }
  })
  Item.associate = function (models) {
    Item.belongsToMany(models.Supplier, {
      through    : 'Supplier_Item',
      foreignKey : 'itemId',
      otherKey   : 'supplierId'
    });
  };
  return Item;
};
